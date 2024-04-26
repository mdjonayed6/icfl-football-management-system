import express from "express";
import { announcementController } from "./announcement.controller";

const router = express.Router();

// Create Announcement
router.post('/', announcementController.createAnnouncements);

// Get Announcements by Organizer ID
router.get('/organizer/:organizer_id', announcementController.getAnnouncementsByOrganizerId);

// Get Single Announcement
router.get('/:id', announcementController.getSingleAnnouncement);

// Update Announcement
router.put('/:id', announcementController.updateAnnouncement);

// Delete Announcement
router.delete('/:id', announcementController.deleteAnnouncement);

export const announcementRoutes = router;
