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
exports.dashboardController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
const pointsTable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { season } = req.params;
    try {
        const query = `
        SELECT 
    teams.id AS team_id,
    teams.team_name,
    SUM(CASE 
            WHEN matches.team1_id = teams.id THEN matches.team1_score
            WHEN matches.team2_id = teams.id THEN matches.team2_score
            ELSE 0
        END) AS GF,
    SUM(CASE 
            WHEN matches.team1_id = teams.id THEN matches.team2_score
            WHEN matches.team2_id = teams.id THEN matches.team1_score
            ELSE 0
        END) AS GA,
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score > matches.team2_score THEN 3
            WHEN matches.team2_id = teams.id AND matches.team2_score > matches.team1_score THEN 3
            ELSE 0
        END) 
    +
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score = matches.team2_score THEN 1
            WHEN matches.team2_id = teams.id AND matches.team2_score = matches.team1_score THEN 1
            ELSE 0
        END) AS points,
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score > matches.team2_score THEN 1
            WHEN matches.team2_id = teams.id AND matches.team2_score > matches.team1_score THEN 1
            ELSE 0
        END) AS wins,
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score < matches.team2_score THEN 1
            WHEN matches.team2_id = teams.id AND matches.team2_score < matches.team1_score THEN 1
            ELSE 0
        END) AS losses,
    SUM(CASE 
            WHEN matches.team1_id = teams.id AND matches.team1_score = matches.team2_score THEN 1
            WHEN matches.team2_id = teams.id AND matches.team2_score = matches.team1_score THEN 1
            ELSE 0
        END) AS draws,
   
        SUM(CASE 
            WHEN matches.team1_id = teams.id THEN matches.team1_score
            WHEN matches.team2_id = teams.id THEN matches.team2_score
            ELSE 0
        END)
    - 
    SUM(CASE 
        WHEN matches.team1_id = teams.id THEN matches.team2_score
        WHEN matches.team2_id = teams.id THEN matches.team1_score
        ELSE 0
    END)  AS GD,
    COUNT(*) AS MP
FROM 
    teams
LEFT JOIN 
    matches ON teams.id = matches.team1_id OR teams.id = matches.team2_id
WHERE 
    matches.match_status = 'completed'
    AND EXTRACT(YEAR FROM matches.match_date) = '${season}'
GROUP BY 
    teams.id, teams.team_name
    ORDER BY 
    points DESC
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        (0, sendApiResponse_1.default)(res, 200, true, 'Points fetched successfully', result);
    }
    catch (error) {
        next(error);
    }
});
const countsDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const totalUsersResult = yield queryCollection_1.Query.executeQuery(`SELECT count(*) as totalCount FROM users`);
        const totalTeamsResult = yield queryCollection_1.Query.executeQuery(`SELECT count(*) as totalCount FROM teams`);
        const totalPlayersResult = yield queryCollection_1.Query.executeQuery(`SELECT count(*) as totalCount FROM users WHERE role = 'player'`);
        const totalOwnerResult = yield queryCollection_1.Query.executeQuery(`SELECT count(*) as totalCount FROM users WHERE role = 'owner'`);
        const totalUsers = ((_a = totalUsersResult[0]) === null || _a === void 0 ? void 0 : _a.totalCount) || 0;
        const totalTeams = ((_b = totalTeamsResult[0]) === null || _b === void 0 ? void 0 : _b.totalCount) || 0;
        const totalPlayer = ((_c = totalPlayersResult[0]) === null || _c === void 0 ? void 0 : _c.totalCount) || 0;
        const totalOwner = ((_d = totalOwnerResult[0]) === null || _d === void 0 ? void 0 : _d.totalCount) || 0;
        res.status(200).send({
            totalUsers: totalUsers,
            totalTeams: totalTeams,
            totalPlayer: totalPlayer,
            totalOwner: totalOwner,
        });
    }
    catch (error) {
        next(error); // Handle error appropriately
    }
});
const upcommingMatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT 
    m.id AS match_id,
    m.team1_score,
    m.team2_score,
    m.match_date,
    m.match_time,
    m.match_stage,
    t1.team_name AS team1_name,
    t1.photo AS team1_logo,
    t2.team_name AS team2_name,
    t2.photo AS team2_logo
FROM 
    matches m
INNER JOIN 
    teams t1 ON m.team1_id = t1.id
INNER JOIN 
    teams t2 ON m.team2_id = t2.id
WHERE 
    m.match_status = 'upcoming'
    AND (m.match_date > CURDATE() OR (m.match_date = CURDATE() AND m.match_time > CURTIME()))
ORDER BY 
    m.match_date ASC, m.match_time ASC
LIMIT 1;

        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        (0, sendApiResponse_1.default)(res, 200, true, 'Points fetched successfully', result);
    }
    catch (error) {
    }
});
const createPerformance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, goals, yc, rc, assists, season } = req.body;
    try {
        const existPlayer = yield queryCollection_1.Query.executeQuery(`SELECT * FROM users WHERE user_id='${user_id}' AND role='player'`);
        if (existPlayer.length === 0) {
            return (0, sendApiResponse_1.default)(res, 403, false, 'Player not found');
        }
        const query = `
        INSERT INTO performances (user_id, goals, yc, rc, assists, season) VALUES ('${user_id}', '${goals}', '${yc}', '${rc}', '${assists}','${season}')
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        return (0, sendApiResponse_1.default)(res, 200, true, 'Performance saved successfully', result);
    }
    catch (error) {
        next(error);
    }
});
// Player Performance
const getPlayerPerformance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { season } = req.params;
    try {
        const query = `
        SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.photo,
        t.team_name,
        SUM(p.goals) AS total_goals,
        SUM(p.yc) AS total_yc,
        SUM(p.rc) AS total_rc,
        SUM(p.assists) AS total_assists,
        p.season
    FROM 
        performances p
    JOIN 
        users u ON p.user_id = u.user_id
    JOIN 
        players pl ON u.user_id = pl.uni_id
    JOIN 
        teams t ON pl.team_id = t.id
    WHERE 
        p.season = '${season}'
    GROUP BY 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.photo,
        t.team_name,
        p.season
    ORDER BY 
        total_goals DESC;        
        `;
        const result = yield queryCollection_1.Query.executeQuery(query);
        (0, sendApiResponse_1.default)(res, 200, true, 'Performance fetched successfully', result);
    }
    catch (error) {
        next(error);
    }
});
// get printable player informattion
const getPlayerInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.params;
    try {
        const query = `SELECT * FROM users WHERE role ='${role}'`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        (0, sendApiResponse_1.default)(res, 200, true, 'Player Information fetched successfully', result);
    }
    catch (error) {
        next(error);
    }
});
exports.dashboardController = {
    pointsTable,
    countsDashboard,
    upcommingMatch,
    createPerformance,
    getPlayerPerformance,
    getPlayerInformation,
};
