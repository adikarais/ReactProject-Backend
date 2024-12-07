import { Router } from 'express';
// import { getAllUsers, getAcraById, createAcra, updateAcra, deteleAcra } from '../controllers/AcraController.mjs';
import { createUsers, deteleUsers, getUsersById, getAllUsers, updateUsers } from '../controllers/UsersController.mjs';
import { getAllUsers } from '../controllers/UserController.mjs';

const UsersRoutes = Router();

// Ambil semua Acra
UsersRoutes.get('/', getAllUsers);

// Ambil Acra by ID
UsersRoutes.get('/:id', getUsersById);

// Buat Acra Baru
UsersRoutes.post('/', createUsers);

// Update category
UsersRoutes.put('/:id', updateUsers);

// Delete Category
UsersRoutes.delete('/:id', deteleUsers);

export default UsersRoutes;
