import express from "express";
import { ruleController } from "./rules.controller";
const router = express.Router()

router.post('/', ruleController.createRule)
router.get('/:id', ruleController.getSingleRule)
router.put('/:id', ruleController.updateRule)
router.delete('/:id', ruleController.deleteRule)
router.get('/all/:id', ruleController.getAllRules)

export const ruleRoutes = router;