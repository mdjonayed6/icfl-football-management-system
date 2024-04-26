import express from "express";
import { refereeController } from "./referee.controller";

const router = express.Router();

router.get('/my-match/:id', refereeController.getMyMatch)

export const refereeRoutes = router