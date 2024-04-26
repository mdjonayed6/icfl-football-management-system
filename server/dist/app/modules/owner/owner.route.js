"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const owner_controller_1 = require("./owner.controller");
const router = express_1.default.Router();
router.get('/my-team/:id', owner_controller_1.ownerController.myTeam);
router.post('/my-players', owner_controller_1.ownerController.createPlayer);
router.get('/get-user/:id', owner_controller_1.ownerController.getUser);
router.get('/get-myplayer/:id', owner_controller_1.ownerController.getMyPlayers);
router.put('/update-player/:id', owner_controller_1.ownerController.updatePlayer);
router.delete('/delete-player/:id', owner_controller_1.ownerController.deletePlayer);
router.get('/match-schedule/:id', owner_controller_1.ownerController.getMatchSchedule);
router.get('/match-rules/:id', owner_controller_1.ownerController.matchRules);
router.get('/announcements/:id', owner_controller_1.ownerController.getAnnouncements);
exports.ownerRoutes = router;
