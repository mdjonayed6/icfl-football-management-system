import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";


const myTeam = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const result = await Query.selectOne('teams', 'owner_id', id);
        sendApiResponse(res, 200, true, 'My Team successfully retrieved', result);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await Query.executeQuery(`SELECT * FROM users WHERE user_id = '${id}' AND role='player' AND status='ok'`);
        if (result.length > 0) {
            sendApiResponse(res, 200, true, 'User successfully retrieved', result[0]);
        }
        else {
            sendApiResponse(res, 200, false, 'User not found', result);
        }
    } catch (error) {
        next(error);
    }
}

const createPlayer = async (req: Request, res: Response, next: NextFunction) => {
    const { uni_id, owner_id, position } = req.body;
    try {

        // Player exist for other team
        const existingPlayer = await Query.executeQuery(`SELECT * FROM players WHERE uni_id ='${uni_id}'`)
        if (existingPlayer.length > 0) {
            return sendApiResponse(res, 403, false, 'Player already exists for other team');
        }

        // Actually player registered or not
        const existPlayer = await Query.executeQuery(`SELECT * FROM users WHERE user_id = '${uni_id}' AND role='player' AND status = 'ok'`);
        if (existPlayer.length == 0) {
            return sendApiResponse(res, 403, false, 'Player Not found')
        }

        const existOwner = await Query.selectOne('teams', 'owner_id', owner_id);
        const user_id = existPlayer[0]?.id;
        const team_id = existOwner?.id;

        const result = await Query.executeQuery(`INSERT INTO players (user_id, team_id, uni_id, owner_id, position) VALUES ('${user_id}','${team_id}','${uni_id}','${owner_id}','${position}')`);
        if (result) {
            sendApiResponse(res, 200, true, 'Player added successfully', result)
        }
        else {
            sendApiResponse(res, 403, false, 'Something went wrong', result)
        }

    } catch (error) {
        next(error)
    }
}

// My players

const getMyPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const query = `
                SELECT 
            players.id AS player_id,
            players.user_id,
            players.team_id,
            players.uni_id,
            players.position,
            users.username,
            users.email,
            users.phone,
            users.dept_id,
            users.photo,
            users.role,
            users.created_at AS user_created_at,
            users.updated_at AS user_updated_at
        FROM 
            players
        JOIN 
            users ON players.user_id = users.id
        WHERE 
            players.owner_id = '${id}';

        `
        const result = await Query.executeQuery(query);
        if (result.length > 0) {
            sendApiResponse(res, 200, true, 'Players successfully retrieved', result);
        }
        else {
            sendApiResponse(res, 200, false, 'Players not found', result);
        }
    } catch (error) {
        next(error);
    }
}

// Update player field postion
const updatePlayer = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { position } = req.body;
    try {
        const result = await Query.executeQuery(`UPDATE players SET position = '${position}' WHERE id = '${id}'`);
        if (result) {
            sendApiResponse(res, 200, true, 'Position updated successfully', result);
        }
        else {
            sendApiResponse(res, 403, false, 'Something went wrong', result);
        }
    } catch (error) {
        next(error);
    }
}

// Delete Player 
const deletePlayer = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await Query.executeQuery(`DELETE FROM players WHERE id = '${id}'`);
        if (result) {
            sendApiResponse(res, 200, true, 'Player deleted successfully', result);
        }
        else {
            sendApiResponse(res, 403, false, 'Something went wrong', result);
        }
    } catch (error) {
        next(error);
    }
}

// Get Match schedule
const getMatchSchedule = async (req: Request, res: Response, next: NextFunction) => {
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
            (teams1.owner_id = '${id}' OR teams2.owner_id = '${id}')
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

// Match Rules
const matchRules = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await Query.executeQuery(`SELECT * FROM rules WHERE match_id = '${id}'`)
        sendApiResponse(res, 200, true, 'Match Rules Success ', result)
    } catch (error) {
        next(error);
    }
}

// Organizer announcements

const getAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const query = `
        SELECT 
    teams.id AS team_id,
    teams.team_name,
    teams.owner_id,
    announcements.id AS announcement_id,
    announcements.title,
    announcements.description,
    announcements.organizer_id
FROM 
    teams
JOIN 
    announcements ON teams.organizer_id = announcements.organizer_id
WHERE 
    teams.owner_id = ${id};
        `
        const result = await Query.executeQuery(query)
        sendApiResponse(res, 200, true, 'Announcements Success ', result)
    } catch (error) {
        next(error);
    }
}



export const ownerController = {
    myTeam,
    createPlayer,
    getUser,
    getMyPlayers,
    updatePlayer,
    deletePlayer,
    getMatchSchedule,
    matchRules,
    getAnnouncements
}