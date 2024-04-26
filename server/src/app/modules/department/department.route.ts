import express from 'express'
import { departmentController } from './department.controller'

const router = express.Router()

router.get('/', departmentController.getDept)


export const departmentRoutes = router