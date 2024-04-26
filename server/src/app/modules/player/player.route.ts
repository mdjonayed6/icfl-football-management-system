import express from "express";
import { playerController } from "./player.controller";

const router = express.Router();

router.get('/my-team/:id', playerController.myTeam)
router.get('/player-match-schedule/:id', playerController.playerMatchSchedule)
router.get('/my-teammate/:id', playerController.myTeamMate)
router.get('/announcements/myteam', playerController.announceMents)

export const playerRoutes = router;