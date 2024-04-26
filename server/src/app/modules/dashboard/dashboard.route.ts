import express from "express";
import { dashboardController } from "./dashboard.controller";

const router = express.Router();

router.get('/points-table/:season', dashboardController.pointsTable)
router.get('/count', dashboardController.countsDashboard)
router.get('/upcomming', dashboardController.upcommingMatch)
router.post('/performance', dashboardController.createPerformance)
router.get('/performance/:season', dashboardController.getPlayerPerformance)
router.get('/playerInformation/:role', dashboardController.getPlayerInformation)

export const dashboardRoutes = router