import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";


const createAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
    const {
        organizer_id,
        title,
        description
    } = req.body;

    try {
        const query = `
            INSERT INTO announcements (
                organizer_id, title, description
            )
            VALUES (
                '${organizer_id}', '${title}', '${description}'
            )
        `;

        const result = await Query.executeQuery(query);

        if (result) {
            return sendApiResponse(res, 200, true, 'Announcement created successfully', result);
        } else {
            return sendApiResponse(res, 200, false, 'Failed to create Announcement');
        }
    } catch (error) {
        next(error);
    }
};

const getAnnouncementsByOrganizerId = async (req: Request, res: Response, next: NextFunction) => {
    const { organizer_id } = req.params;

    try {
        const query = `SELECT * FROM announcements WHERE organizer_id = '${organizer_id}'`;
        const result = await Query.executeQuery(query);

        if (result.length > 0) {
            return sendApiResponse(res, 200, true, 'Announcements fetched successfully', result);
        } else {
            return sendApiResponse(res, 404, false, 'No announcements found');
        }
    } catch (error) {
        next(error);
    }
};

const getSingleAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM announcements WHERE id = '${id}'`;
        const result = await Query.executeQuery(query);

        if (result.length > 0) {
            return sendApiResponse(res, 200, true, 'Announcement fetched successfully', result[0]);
        } else {
            return sendApiResponse(res, 404, false, 'Announcement not found');
        }
    } catch (error) {
        next(error);
    }
};

const updateAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {
        organizer_id,
        title,
        description
    } = req.body;

    try {
        const query = `
            UPDATE announcements
            SET organizer_id = '${organizer_id}', title = '${title}', description = '${description}'
            WHERE id = '${id}'
        `;

        const result = await Query.executeQuery(query);

        if (result) {
            return sendApiResponse(res, 200, true, 'Announcement updated successfully', result);
        } else {
            return sendApiResponse(res, 200, false, 'Failed to update Announcement');
        }
    } catch (error) {
        next(error);
    }
};

const deleteAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM announcements WHERE id = '${id}'`;
        const result = await Query.executeQuery(query);

        if (result) {
            return sendApiResponse(res, 200, true, 'Announcement deleted successfully', result);
        } else {
            return sendApiResponse(res, 200, false, 'Failed to delete Announcement');
        }
    } catch (error) {
        next(error);
    }
};




export const announcementController = {
    createAnnouncements,
    getAnnouncementsByOrganizerId,
    getSingleAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
}