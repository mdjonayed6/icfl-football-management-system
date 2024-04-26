import express from "express";
import { teamController } from "./team.controller";

const router = express.Router()

router.post('/', teamController.createTeam)
router.get('/:id', teamController.getTeams)
router.delete('/:id', teamController.deleteTeams)
// router.put('/:id', teamController.updateTeams)

export const teamRoutes = router;