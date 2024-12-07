import { Router } from 'express';
// import { getAllUserEvents, getAcraById, createAcra, updateAcra, deteleAcra } from '../controllers/AcraController.mjs';
import { createUserEvents, deteleUserEvents, getUserEventsById, getAllUserEvents, updateUserEvents } from '../controllers/UserEventsController.mjs';
import { getAllUserEvents } from '../controllers/UserEventsController.mjs';

const UserEventsRoutes = Router();

// Ambil semua Acra
UserEventsRoutes.get('/', getAllUserEvents);

// Ambil Acra by ID
UserEventsRoutes.get('/:id', getUserEventsById);

// Buat Acra Baru
UserEventsRoutes.post('/', createUserEvents);

// Update category
UserEventsRoutes.put('/:id', updateUserEvents);

// Delete Category
UserEventsRoutes.delete('/:id', deteleUserEvents);

export default UserEventsRoutes;
