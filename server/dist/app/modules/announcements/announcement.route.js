"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const announcement_controller_1 = require("./announcement.controller");
const router = express_1.default.Router();
// Create Announcement
router.post('/', announcement_controller_1.announcementController.createAnnouncements);
// Get Announcements by Organizer ID
router.get('/organizer/:organizer_id', announcement_controller_1.announcementController.getAnnouncementsByOrganizerId);
// Get Single Announcement
router.get('/:id', announcement_controller_1.announcementController.getSingleAnnouncement);
// Update Announcement
router.put('/:id', announcement_controller_1.announcementController.updateAnnouncement);
// Delete Announcement
router.delete('/:id', announcement_controller_1.announcementController.deleteAnnouncement);
exports.announcementRoutes = router;
