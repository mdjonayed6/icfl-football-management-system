"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const helmet_1 = __importDefault(require("helmet"));
const department_route_1 = require("./app/modules/department/department.route");
const team_route_1 = require("./app/modules/team/team.route");
const match_route_1 = require("./app/modules/match/match.route");
const rules_route_1 = require("./app/modules/rules/rules.route");
const announcement_route_1 = require("./app/modules/announcements/announcement.route");
const owner_route_1 = require("./app/modules/owner/owner.route");
const player_route_1 = require("./app/modules/player/player.route");
const referee_route_1 = require("./app/modules/referee/referee.route");
const dashboard_route_1 = require("./app/modules/dashboard/dashboard.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use('/uploads', express_1.default.static('uploads'));
// Route handlings;
app.use('/api/v1/users', user_route_1.userRoutes);
app.use('/api/v1/departments', department_route_1.departmentRoutes);
app.use('/api/v1/teams', team_route_1.teamRoutes);
app.use('/api/v1/matches', match_route_1.matchRoutes);
app.use('/api/v1/rules', rules_route_1.ruleRoutes);
app.use('/api/v1/announcements', announcement_route_1.announcementRoutes);
app.use('/api/v1/owners', owner_route_1.ownerRoutes);
app.use('/api/v1/players', player_route_1.playerRoutes);
app.use('/api/v1/referees', referee_route_1.refereeRoutes);
app.use('/api/v1/dashboard', dashboard_route_1.dashboardRoutes);
// SSL Commerze or any redirect routes will be Here, from controller with functions
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Node.js Server',
        author: 'Md. Jonayed',
        github: 'https://github.com/mdjonayed6',
        linkedin: 'https://www.linkedin.com/in/md-jonayed/',
    });
});
// Route Error
app.all('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
});
// Global Error Handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});
exports.default = app;
