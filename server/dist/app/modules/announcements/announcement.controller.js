"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
const createAnnouncements = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizer_id, title, description } = req.body;
    try {
        const query = `
            INSERT INTO announcements (
                organizer_id, title, description
            )
            VALUES (
                '${organizer_id}', '${title}', '${description}'
            )
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Announcement created successfully', result);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 200, false, 'Failed to create Announcement');
        }
    }
    catch (error) {
        next(error);
    }
});
const getAnnouncementsByOrganizerId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizer_id } = req.params;
    try {
        const query = `SELECT * FROM announcements WHERE organizer_id = '${organizer_id}'`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result.length > 0) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Announcements fetched successfully', result);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 404, false, 'No announcements found');
        }
    }
    catch (error) {
        next(error);
    }
});
const getSingleAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM announcements WHERE id = '${id}'`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result.length > 0) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Announcement fetched successfully', result[0]);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 404, false, 'Announcement not found');
        }
    }
    catch (error) {
        next(error);
    }
});
const updateAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { organizer_id, title, description } = req.body;
    try {
        const query = `
            UPDATE announcements
            SET organizer_id = '${organizer_id}', title = '${title}', description = '${description}'
            WHERE id = '${id}'
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Announcement updated successfully', result);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 200, false, 'Failed to update Announcement');
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `DELETE FROM announcements WHERE id = '${id}'`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Announcement deleted successfully', result);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 200, false, 'Failed to delete Announcement');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.announcementController = {
    createAnnouncements,
    getAnnouncementsByOrganizerId,
    getSingleAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};
