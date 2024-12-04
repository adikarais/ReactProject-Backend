import { Router } from 'express';
import { getNotifications, createNotification } from '../controllers/NotificationsController.mjs';

const NotificationsRoutes = Router();

// Ambil semua notifikasi
NotificationsRoutes.get('/', getNotifications);

// Buat notifikasi baru
NotificationsRoutes.post('/', createNotification);

export default NotificationsRoutes;
