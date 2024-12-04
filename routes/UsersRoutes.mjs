import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/UsersController.mjs';

const UsersRoutes = Router();

// Ambil semua users
UsersRoutes.get('/', getAllUsers);

// Ambil user by ID
UsersRoutes.get('/:id', getUserById);

export default UsersRoutes;
