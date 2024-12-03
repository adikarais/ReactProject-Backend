import { Router } from 'express';
// import { getAllAcara, getAcraById, createAcra, updateAcra, deteleAcra } from '../controllers/AcraController.mjs';
import { createAcara, deteleAcara, getAcaraById, getAllAcara, updateAcara } from '../controllers/AcaraController.mjs';

const AcaraRoutes = Router();

// Ambil semua Acra
AcaraRoutes.get('/', getAllAcara);

// Ambil Acra by ID
AcaraRoutes.get('/:id', getAcaraById);

// Buat Acra Baru
AcaraRoutes.post('/', createAcara);

// Update category
AcaraRoutes.put('/:id', updateAcara);

// Delete Category
AcaraRoutes.delete('/:id', deteleAcara);

export default AcaraRoutes;
