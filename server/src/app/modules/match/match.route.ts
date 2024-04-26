import express from "express";
import { matchController } from "./match.controller";
const router = express.Router()

router.post('/', matchController.createMatch)
router.get('/:id', matchController.organizerMatches)
router.get('/single/:id', matchController.getSingleMatch)
router.put('/single/:id', matchController.updateMatch)
router.delete('/single/:id', matchController.deleteMatch)

export const matchRoutes = router;