import express from "express";
import { ownerController } from "./owner.controller";

const router = express.Router();

router.get('/my-team/:id', ownerController.myTeam)
router.post('/my-players', ownerController.createPlayer)
router.get('/get-user/:id', ownerController.getUser)
router.get('/get-myplayer/:id', ownerController.getMyPlayers)
router.put('/update-player/:id', ownerController.updatePlayer)
router.delete('/delete-player/:id', ownerController.deletePlayer)
router.get('/match-schedule/:id', ownerController.getMatchSchedule)
router.get('/match-rules/:id', ownerController.matchRules)
router.get('/announcements/:id', ownerController.getAnnouncements)

export const ownerRoutes = router;