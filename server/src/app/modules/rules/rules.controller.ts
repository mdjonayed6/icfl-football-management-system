import { NextFunction, Request, Response } from "express";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";
import { Query } from "../../lib/dbQuery/queryCollection";

const createRule = async (req: Request, res: Response, next: NextFunction) => {
    const {
        match_id, organizer_id, title, description
    } = req.body;

    try {
        // Check if the rule with the same match_id and title already exists
        const existingRule = await Query.executeQuery(`SELECT * FROM rules WHERE match_id = '${match_id}' AND title = '${title}'`);

        if (existingRule.length > 0) {
            return sendApiResponse(res, 403, false, 'Rule with the same match_id and title already exists');
        }

        // If rule doesn't exist, proceed to create new rule
        const query = `
            INSERT INTO rules (
                match_id, organizer_id, title, description
            )
            VALUES (
                '${match_id}', '${organizer_id}', '${title}', '${description}'
            )
        `;

        const result = await Query.executeQuery(query);

        if (result) {
            return sendApiResponse(res, 200, true, 'Rule created successfully', result);
        } else {
            return sendApiResponse(res, 200, false, 'Failed to create Rule');
        }
    } catch (error) {
        next(error);
    }
};

const updateRule = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {
        match_id, organizer_id, title, description
    } = req.body;

    try {
        const query = `
            UPDATE rules
            SET
                match_id = '${match_id}',
                organizer_id = '${organizer_id}',
                title = '${title}',
                description = '${description}'
            WHERE
                id = '${id}'
        `;

        const result = await Query.executeQuery(query);

        if (result) {
            return sendApiResponse(res, 200, true, 'Rule updated successfully', result);
        } else {
            return sendApiResponse(res, 200, false, 'Failed to update Rule');
        }
    } catch (error) {
        next(error);
    }
};

const deleteRule = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM rules WHERE id = '${id}'`;
        const result = await Query.executeQuery(query);

        if (result) {
            return sendApiResponse(res, 200, true, 'Rule deleted successfully', result);
        } else {
            return sendApiResponse(res, 200, false, 'Failed to delete Rule');
        }
    } catch (error) {
        next(error);
    }
};

const getSingleRule = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM rules WHERE id = '${id}'`;
        const result = await Query.executeQuery(query);

        if (result.length > 0) {
            return sendApiResponse(res, 200, true, 'Rule fetched successfully', result[0]);
        } else {
            return sendApiResponse(res, 404, false, 'Rule not found');
        }
    } catch (error) {
        next(error);
    }
};

const getAllRules = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try {
        const query = `SELECT * FROM rules WHERE organizer_id = ${id}`;
        const result = await Query.executeQuery(query);

        return sendApiResponse(res, 200, true, 'Rules fetched successfully', result);
    } catch (error) {
        next(error);
    }
};



export const ruleController = {
    createRule,
    getAllRules,
    getSingleRule,
    updateRule,
    deleteRule
}