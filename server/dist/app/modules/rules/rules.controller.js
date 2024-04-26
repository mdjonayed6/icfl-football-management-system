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
exports.ruleController = void 0;
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const createRule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { match_id, organizer_id, title, description } = req.body;
    try {
        // Check if the rule with the same match_id and title already exists
        const existingRule = yield queryCollection_1.Query.executeQuery(`SELECT * FROM rules WHERE match_id = '${match_id}' AND title = '${title}'`);
        if (existingRule.length > 0) {
            return (0, sendApiResponse_1.default)(res, 403, false, 'Rule with the same match_id and title already exists');
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
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Rule created successfully', result);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 200, false, 'Failed to create Rule');
        }
    }
    catch (error) {
        next(error);
    }
});
const updateRule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { match_id, organizer_id, title, description } = req.body;
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
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Rule updated successfully', result);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 200, false, 'Failed to update Rule');
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteRule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `DELETE FROM rules WHERE id = '${id}'`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Rule deleted successfully', result);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 200, false, 'Failed to delete Rule');
        }
    }
    catch (error) {
        next(error);
    }
});
const getSingleRule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM rules WHERE id = '${id}'`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result.length > 0) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Rule fetched successfully', result[0]);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 404, false, 'Rule not found');
        }
    }
    catch (error) {
        next(error);
    }
});
const getAllRules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `SELECT * FROM rules WHERE organizer_id = ${id}`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        return (0, sendApiResponse_1.default)(res, 200, true, 'Rules fetched successfully', result);
    }
    catch (error) {
        next(error);
    }
});
exports.ruleController = {
    createRule,
    getAllRules,
    getSingleRule,
    updateRule,
    deleteRule
};
