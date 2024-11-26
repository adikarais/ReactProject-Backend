import { Router } from "express";
import { createCategory, deteleCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/CategoryController.mjs";

const CategoryRoutes = Router()

// Ambil semua kategori
CategoryRoutes.get('/', getAllCategory)

// Ambil kategori by ID
CategoryRoutes.get('/:id', getCategoryById)

// Buat Kategori Baru
CategoryRoutes.post('/', createCategory)

// Update category
CategoryRoutes.put('/:id', updateCategory)

// Delete Category
CategoryRoutes.delete('/:id', deteleCategory)

export default CategoryRoutes