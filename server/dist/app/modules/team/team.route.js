"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const team_controller_1 = require("./team.controller");
const router = express_1.default.Router();
router.post('/', team_controller_1.teamController.createTeam);
router.get('/:id', team_controller_1.teamController.getTeams);
router.delete('/:id', team_controller_1.teamController.deleteTeams);
// router.put('/:id', teamController.updateTeams)
exports.teamRoutes = router;
