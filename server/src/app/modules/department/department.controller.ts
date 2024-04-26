import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";

// Getting all departments
const getDept = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Query.selectOne('departments', 'id', 1)
        sendApiResponse(res, 200, true, 'Department fetched successfully', result);
    } catch (error) {
        next(error);
    }
}

export const departmentController = {
    getDept
}