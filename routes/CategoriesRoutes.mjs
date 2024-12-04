import { Router } from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/CategoriesController.mjs';

const CategoriesRoutes = Router();

// Ambil semua kategori
CategoriesRoutes.get('/', getAllCategories);

// Ambil kategori by ID
CategoriesRoutes.get('/:id', getCategoryById);

// Buat kategori baru
CategoriesRoutes.post('/', createCategory);

// Update kategori
CategoriesRoutes.put('/:id', updateCategory);

// Hapus kategori
CategoriesRoutes.delete('/:id', deleteCategory);

export default CategoriesRoutes;
