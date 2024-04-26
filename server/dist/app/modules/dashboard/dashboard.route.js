"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("./dashboard.controller");
const router = express_1.default.Router();
router.get('/points-table/:season', dashboard_controller_1.dashboardController.pointsTable);
router.get('/count', dashboard_controller_1.dashboardController.countsDashboard);
router.get('/upcomming', dashboard_controller_1.dashboardController.upcommingMatch);
router.post('/performance', dashboard_controller_1.dashboardController.createPerformance);
router.get('/performance/:season', dashboard_controller_1.dashboardController.getPlayerPerformance);
router.get('/playerInformation/:role', dashboard_controller_1.dashboardController.getPlayerInformation);
exports.dashboardRoutes = router;
