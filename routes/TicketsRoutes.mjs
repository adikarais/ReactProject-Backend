import { Router } from 'express';
// import { getAllTickets, getAcraById, createAcra, updateAcra, deteleAcra } from '../controllers/AcraController.mjs';
import { createTickets, deteleTickets, getTicketsById, getAllTickets, updateTickets } from '../controllers/TicketsController.mjs';
import { getAllTickets } from '../controllers/TicketsController.mjs';

const TicketsRoutes = Router();

// Ambil semua Acra
TicketsRoutes.get('/', getAllTickets);

// Ambil Acra by ID
TicketsRoutes.get('/:id', getTicketsById);

// Buat Acra Baru
TicketsRoutes.post('/', createTickets);

// Update category
TicketsRoutes.put('/:id', updateTickets);

// Delete Category
TicketsRoutes.delete('/:id', deteleTickets);

export default TicketsRoutes;
