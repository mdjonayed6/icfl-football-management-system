"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRoutes = void 0;
const express_1 = __importDefault(require("express"));
const match_controller_1 = require("./match.controller");
const router = express_1.default.Router();
router.post('/', match_controller_1.matchController.createMatch);
router.get('/:id', match_controller_1.matchController.organizerMatches);
router.get('/single/:id', match_controller_1.matchController.getSingleMatch);
router.put('/single/:id', match_controller_1.matchController.updateMatch);
router.delete('/single/:id', match_controller_1.matchController.deleteMatch);
exports.matchRoutes = router;
