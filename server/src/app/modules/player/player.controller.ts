import { NextFunction, Request, Response } from "express";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";
import { Query } from "../../lib/dbQuery/queryCollection";


const myTeam = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const query = `
        SELECT 
    players.id AS player_id,
    players.user_id,
    players.team_id,
    players.uni_id,
    teams.team_name,
    teams.owner_id,
    users.username AS owner_name,
    teams.organizer_id,
    teams.batch_year,
    teams.season,
    teams.photo
FROM 
    players
JOIN 
    teams ON players.team_id = teams.id
JOIN 
    users ON teams.owner_id = users.id
WHERE 
    players.user_id = ${id};

        `
        const result = await Query.executeQuery(query);
        sendApiResponse(res, 200, true, 'My Team successfully retrieved', result);
    } catch (error) {
        next(error);
    }
}

const playerMatchSchedule = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const query = `
        SELECT 
         matches.id AS match_id,
            teams1.team_name AS team1_name,
            teams2.team_name AS team2_name,
            matches.team1_score,
            matches.team2_score,
            matches.match_date,
            matches.match_time,
            matches.match_status,
            users.username AS referee_name
        FROM 
            matches
        JOIN 
            teams AS teams1 ON matches.team1_id = teams1.id
        JOIN 
            teams AS teams2 ON matches.team2_id = teams2.id
        JOIN 
            users ON matches.referee_id = users.id
        WHERE 
            (teams1.id = '${id}' OR teams2.id = '${id}')
            AND teams1.id != teams2.id  -- Exclude matches where a team plays against itself
        GROUP BY 
            match_id, team1_name, team2_name, team1_score, team2_score, match_date, match_time, referee_name
        `;
        const result = await Query.executeQuery(query);
        if (result.length > 0) {
            sendApiResponse(res, 200, true, 'Match Schedule successfully retrieved', result);
        }
        else {
            sendApiResponse(res, 200, false, 'Match Schedule not found', result);
        }
    } catch (error) {
        next(error);
    }
}

const myTeamMate = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const query = `
        SELECT 
    teams.id AS team_id,
    teams.team_name,
    teams.owner_id,
    teams.organizer_id,
    teams.batch_year,
    teams.season,
    players.id AS player_id,
    players.user_id,
    players.uni_id,
    players.position,
    users.username,
    users.email,
    users.phone,
    users.photo
FROM 
    teams
JOIN 
    players ON teams.id = players.team_id
JOIN 
    users ON players.user_id = users.id
WHERE 
    teams.id = '${id}';

        `
        const result = await Query.executeQuery(query);
        sendApiResponse(res, 200, true, 'Match Schedule successfully retrieved', result);
    } catch (error) {
        next(error);
    }
}

const announceMents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Query.selectAll('announcements')
        sendApiResponse(res, 200, true, 'Match Schedule successfully retrieved', result);
    } catch (error) {
        next(error);
    }
}



export const playerController = {
    myTeam,
    playerMatchSchedule,
    myTeamMate,
    announceMents
}