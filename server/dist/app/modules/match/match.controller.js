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
exports.matchController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
const createMatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { team1_id, team2_id, team1_score, team2_score, match_date, match_time, organizer_id, referee_id } = req.body;
    try {
        // Check if the referee has another match scheduled at the same date and time
        const existingMatch = yield queryCollection_1.Query.executeQuery(`SELECT * FROM matches  WHERE referee_id = '${referee_id}' AND match_date = '${match_date}' AND match_time = '${match_time}'`);
        if (existingMatch.length > 0) {
            return (0, sendApiResponse_1.default)(res, 403, false, 'Referee already has another match scheduled at the same date and time');
        }
        // If referee doesn't have another match, proceed to create new match
        const query = `
            INSERT INTO matches (
                team1_id, team2_id, team1_score, team2_score,
                match_date, match_time, organizer_id, referee_id
            )
            VALUES (
                '${team1_id}', '${team2_id}', '${team1_score}', '${team2_score}',
                '${match_date}', '${match_time}', '${organizer_id}', '${referee_id}'
            )
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            return (0, sendApiResponse_1.default)(res, 200, true, 'Match created successfully', result);
        }
        else {
            return (0, sendApiResponse_1.default)(res, 200, false, 'Failed to create Match');
        }
    }
    catch (error) {
        next(error);
    }
});
const organizerMatches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const organizerId = req.params.id;
    try {
        const query = `
            SELECT 
                matches.id AS match_id,
                team1.team_name AS team1_name,
                team2.team_name AS team2_name,
                matches.team1_score,
                matches.team2_score,
                matches.match_date,
                matches.match_time,
                matches.organizer_id,
                matches.match_status,
                referee.username AS referee_name
            FROM 
                matches
            JOIN 
                teams AS team1 ON matches.team1_id = team1.id
            JOIN 
                teams AS team2 ON matches.team2_id = team2.id
            JOIN 
                users AS referee ON matches.referee_id = referee.id
            WHERE 
                matches.organizer_id = '${organizerId}';
        `;
        const matches = yield queryCollection_1.Query.executeQuery(query);
        (0, sendApiResponse_1.default)(res, 200, true, 'Matches Information gets succesfully', matches);
    }
    catch (error) {
        next(error);
    }
});
const getSingleMatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield queryCollection_1.Query.selectOne('matches', 'id', id, ['team1_score', 'team2_score', 'match_date', 'match_time', 'match_status']);
        (0, sendApiResponse_1.default)(res, 200, true, 'Match fetched successfully', result);
    }
    catch (error) {
        next(error);
    }
});
const updateMatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { team1_score, team2_score, match_date, match_time, match_stage, match_status } = req.body;
    try {
        const query = `
            UPDATE matches
            SET
                team1_score = '${team1_score}',
                team2_score = '${team2_score}',
                match_date = '${match_date}',
                match_time = '${match_time}',
                match_stage = '${match_stage}',
                match_status = '${match_status}'
            WHERE
                id = '${id}'
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        (0, sendApiResponse_1.default)(res, 200, true, 'Update Match successfully updated', result);
    }
    catch (err) {
        next(err);
    }
});
const deleteMatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
            DELETE FROM matches
            WHERE
                id = '${id}'
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result.affectedRows === 0) {
            return (0, sendApiResponse_1.default)(res, 404, false, 'Match not found');
        }
        (0, sendApiResponse_1.default)(res, 200, true, 'Match deleted successfully', result);
    }
    catch (err) {
        next(err);
    }
});
exports.matchController = {
    createMatch,
    organizerMatches,
    getSingleMatch,
    updateMatch,
    deleteMatch
};
