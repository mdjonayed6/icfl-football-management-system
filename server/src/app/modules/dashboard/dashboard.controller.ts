import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";


const pointsTable = async (req: Request, res: Response, next: NextFunction) => {
    const { season } = req.params
    try {
        const query = `
        SELECT 
    teams.id AS team_id,
    teams.team_name,
    SUM(CASE 
            WHEN matches.team1_id = teams.id THEN matches.team1_score
            WHEN matches.team2_id = teams.id THEN matches.team2_score
            ELSE 0
        END) AS GF,
    SUM(CASE 
            WHEN matches.team1_id = teams.id THEN matches.team2_score
            WHEN matches.team2_id = teams.id THEN matches.team1_score
            ELSE 0
        END) AS GA,
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score > matches.team2_score THEN 3
            WHEN matches.team2_id = teams.id AND matches.team2_score > matches.team1_score THEN 3
            ELSE 0
        END) 
    +
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score = matches.team2_score THEN 1
            WHEN matches.team2_id = teams.id AND matches.team2_score = matches.team1_score THEN 1
            ELSE 0
        END) AS points,
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score > matches.team2_score THEN 1
            WHEN matches.team2_id = teams.id AND matches.team2_score > matches.team1_score THEN 1
            ELSE 0
        END) AS wins,
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score < matches.team2_score THEN 1
            WHEN matches.team2_id = teams.id AND matches.team2_score < matches.team1_score THEN 1
            ELSE 0
        END) AS losses,
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score = matches.team2_score THEN 1
            WHEN matches.team2_id = teams.id AND matches.team2_score = matches.team1_score THEN 1
            ELSE 0
        END) AS draws,
   
        SUM(CASE 
            WHEN matches.team1_id = teams.id THEN matches.team1_score
            WHEN matches.team2_id = teams.id THEN matches.team2_score
            ELSE 0
        END)
    - 
    SUM(CASE 
        WHEN matches.team1_id = teams.id THEN matches.team2_score
        WHEN matches.team2_id = teams.id THEN matches.team1_score
        ELSE 0
    END)  AS GD,
    COUNT(*) AS MP
FROM 
    teams
LEFT JOIN 
    matches ON teams.id = matches.team1_id OR teams.id = matches.team2_id
WHERE 
    matches.match_status = 'completed'
    AND EXTRACT(YEAR FROM matches.match_date) = '${season}'
GROUP BY 
    teams.id, teams.team_name
    ORDER BY 
    points DESC
        `
        const result = await Query.executeQuery(query)
        sendApiResponse(res, 200, true, 'Points fetched successfully', result);
    } catch (error) {
        next(error)
    }
}


const countsDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const totalUsersResult = await Query.executeQuery(`SELECT count(*) as totalCount FROM users`);
        const totalTeamsResult = await Query.executeQuery(`SELECT count(*) as totalCount FROM teams`);
        const totalPlayersResult = await Query.executeQuery(`SELECT count(*) as totalCount FROM users WHERE role = 'player'`);
        const totalOwnerResult = await Query.executeQuery(`SELECT count(*) as totalCount FROM users WHERE role = 'owner'`);

        const totalUsers = totalUsersResult[0]?.totalCount || 0;
        const totalTeams = totalTeamsResult[0]?.totalCount || 0;
        const totalPlayer = totalPlayersResult[0]?.totalCount || 0;
        const totalOwner = totalOwnerResult[0]?.totalCount || 0;

        res.status(200).send({
            totalUsers: totalUsers,
            totalTeams: totalTeams,
            totalPlayer: totalPlayer,
            totalOwner: totalOwner,
        });

    } catch (error) {
        next(error); // Handle error appropriately
    }
};

const upcommingMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = `
        SELECT 
    m.id AS match_id,
    m.team1_score,
    m.team2_score,
    m.match_date,
    m.match_time,
    m.match_stage,
    t1.team_name AS team1_name,
    t1.photo AS team1_logo,
    t2.team_name AS team2_name,
    t2.photo AS team2_logo
FROM 
    matches m
INNER JOIN 
    teams t1 ON m.team1_id = t1.id
INNER JOIN 
    teams t2 ON m.team2_id = t2.id
WHERE 
    m.match_status = 'upcoming'
    AND (m.match_date > CURDATE() OR (m.match_date = CURDATE() AND m.match_time > CURTIME()))
ORDER BY 
    m.match_date ASC, m.match_time ASC
LIMIT 1;

        `
        const result = await Query.executeQuery(query)
        sendApiResponse(res, 200, true, 'Points fetched successfully', result);
    } catch (error) {

    }
}

const createPerformance = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, goals, yc, rc, assists, season } = req.body;

    try {
        const existPlayer = await Query.executeQuery(`SELECT * FROM users WHERE user_id='${user_id}' AND role='player'`)

        if (existPlayer.length === 0) {
            return sendApiResponse(res, 403, false, 'Player not found');
        }

        const query = `
        INSERT INTO performances (user_id, goals, yc, rc, assists, season) VALUES ('${user_id}', '${goals}', '${yc}', '${rc}', '${assists}','${season}')
        `
        const result = await Query.executeQuery(query)

        return sendApiResponse(res, 200, true, 'Performance saved successfully', result);
    } catch (error) {
        next(error);
    }
}

// Player Performance
const getPlayerPerformance = async (req: Request, res: Response, next: NextFunction) => {
    const { season } = req.params
    try {
        const query = `
        SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.photo,
        t.team_name,
        SUM(p.goals) AS total_goals,
        SUM(p.yc) AS total_yc,
        SUM(p.rc) AS total_rc,
        SUM(p.assists) AS total_assists,
        p.season
    FROM 
        performances p
    JOIN 
        users u ON p.user_id = u.user_id
    JOIN 
        players pl ON u.user_id = pl.uni_id
    JOIN 
        teams t ON pl.team_id = t.id
    WHERE 
        p.season = '${season}'
    GROUP BY 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.photo,
        t.team_name,
        p.season
    ORDER BY 
        total_goals DESC;        
        `
        const result = await Query.executeQuery(query)
        sendApiResponse(res, 200, true, 'Performance fetched successfully', result);
    } catch (error) {
        next(error);
    }
}

// get printable player informattion
const getPlayerInformation = async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.params;
    try {
        const query = `SELECT * FROM users WHERE role ='${role}'`
        const result = await Query.executeQuery(query)
        sendApiResponse(res, 200, true, 'Player Information fetched successfully', result);
    } catch (error) {
        next(error)
    }
}

export const dashboardController = {
    pointsTable,
    countsDashboard,
    upcommingMatch,
    createPerformance,
    getPlayerPerformance,
    getPlayerInformation,
}