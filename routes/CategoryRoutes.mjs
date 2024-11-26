import { Router } from 'express';
import { getAllProfil, getProfilById, createProfil, updateProfil, deteleProfil } from '../controllers/CategoryController.mjs';

const CategoryRoutes = Router();

// Ambil semua kategori
CategoryRoutes.get('/', getAllProfil);

// Ambil kategori by ID
CategoryRoutes.get('/:id', getProfilById);

// Buat Kategori Baru
CategoryRoutes.post('/', createProfil);

// Update category
CategoryRoutes.put('/:id', updateProfil);

// Delete Category
CategoryRoutes.delete('/:id', deteleProfil);

export default CategoryRoutes;
