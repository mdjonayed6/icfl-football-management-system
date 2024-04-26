"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const player_controller_1 = require("./player.controller");
const router = express_1.default.Router();
router.get('/my-team/:id', player_controller_1.playerController.myTeam);
router.get('/player-match-schedule/:id', player_controller_1.playerController.playerMatchSchedule);
router.get('/my-teammate/:id', player_controller_1.playerController.myTeamMate);
router.get('/announcements/myteam', player_controller_1.playerController.announceMents);
exports.playerRoutes = router;
