"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const rules_controller_1 = require("./rules.controller");
const router = express_1.default.Router();
router.post('/', rules_controller_1.ruleController.createRule);
router.get('/:id', rules_controller_1.ruleController.getSingleRule);
router.put('/:id', rules_controller_1.ruleController.updateRule);
router.delete('/:id', rules_controller_1.ruleController.deleteRule);
router.get('/all/:id', rules_controller_1.ruleController.getAllRules);
exports.ruleRoutes = router;
