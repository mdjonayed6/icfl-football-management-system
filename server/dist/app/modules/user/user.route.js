"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.createUser);
router.post('/login', user_controller_1.userController.signInUser);
router.get('/all', user_controller_1.userController.getAllUsers);
router.get('/all-referees', user_controller_1.userController.getReferees);
router.get('/pending-organizer', user_controller_1.userController.getPendingUsers);
// router.get('/pending-players', userController.getPendingPlayers)
// router.get('/pending-owner', userController.getPendingTeamOwner)
// router.get('/pending-referee', userController.getPendingReferee)
router.get('/all-team-owners', user_controller_1.userController.getAllTeamOwners);
router.get('/:id', user_controller_1.userController.getSingleUser);
router.put('/:id', user_controller_1.userController.updateUser);
router.delete('/:id', user_controller_1.userController.deleteUser);
router.put('/:id/accept', user_controller_1.userController.acceptPendingOrganizer);
// Payment Gateway Routes
// Redirect URL will be in app.ts file, Here redirect URL will not work
/**
 * MIDDLEWARE CONFIGURATION
 * --------------------------------
 * */
// router.get('/', verifyToken, isAdmin,  userController.getUsers)
exports.userRoutes = router;
