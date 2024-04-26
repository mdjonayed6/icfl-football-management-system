import { NextFunction, Request, Response } from "express";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";
import { Query } from "../../lib/dbQuery/queryCollection";


const getMyMatch = async (req: Request, res: Response, next: NextFunction) => {
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
            (matches.referee_id = '${id}')
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

export const refereeController = {
    getMyMatch,
}