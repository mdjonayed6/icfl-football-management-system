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
exports.refereeController = void 0;
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const getMyMatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result.length > 0) {
            (0, sendApiResponse_1.default)(res, 200, true, 'Match Schedule successfully retrieved', result);
        }
        else {
            (0, sendApiResponse_1.default)(res, 200, false, 'Match Schedule not found', result);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.refereeController = {
    getMyMatch,
};
