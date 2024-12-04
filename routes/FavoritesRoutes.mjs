import { Router } from 'express';
import { getFavorites, addFavorite } from '../controllers/FavoritesController.mjs';

const FavoritesRoutes = Router();

// Ambil semua favorit
FavoritesRoutes.get('/', getFavorites);

// Tambahkan favorit baru
FavoritesRoutes.post('/', addFavorite);

export default FavoritesRoutes;
