import { Router } from 'express';
// import { getAllEvents, getAcraById, createAcra, updateAcra, deteleAcra } from '../controllers/AcraController.mjs';
import { createEvents, deteleEvents, getEventsById, getAllEvents, updateEvents } from '../controllers/EventsController.mjs';
import { getAllEvents } from '../controllers/EventController.mjs';

const EventsRoutes = Router();

// Ambil semua Acra
EventsRoutes.get('/', getAllEvents);

// Ambil Acra by ID
EventsRoutes.get('/:id', getEventsById);

// Buat Acra Baru
EventsRoutes.post('/', createEvents);

// Update category
EventsRoutes.put('/:id', updateEvents);

// Delete Category
EventsRoutes.delete('/:id', deteleEvents);

export default EventsRoutes;
