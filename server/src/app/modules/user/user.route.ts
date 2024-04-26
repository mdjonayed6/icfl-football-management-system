import express from "express";
import { userController } from "./user.controller";
import verifyToken from "../../middleware/verifyToken.middleware";
import { isAdmin, isUser } from "../../middleware/auth.middleware";
import { checkUserRoleAndRateLimit } from "../../middleware/apiRateLimit.middleware";

const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.signInUser)
router.get('/all', userController.getAllUsers)
router.get('/all-referees', userController.getReferees)
router.get('/pending-organizer', userController.getPendingUsers)
// router.get('/pending-players', userController.getPendingPlayers)
// router.get('/pending-owner', userController.getPendingTeamOwner)
// router.get('/pending-referee', userController.getPendingReferee)
router.get('/all-team-owners', userController.getAllTeamOwners)
router.get('/:id', userController.getSingleUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.put('/:id/accept', userController.acceptPendingOrganizer)


// Payment Gateway Routes

// Redirect URL will be in app.ts file, Here redirect URL will not work


/**
 * MIDDLEWARE CONFIGURATION
 * --------------------------------
 * */

// router.get('/', verifyToken, isAdmin,  userController.getUsers)

export const userRoutes = router;