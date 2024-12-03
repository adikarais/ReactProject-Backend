import { Router } from 'express';
import { getAllProfil, getProfilById, createProfil, updateProfil, deteleProfil } from '../controllers/ProfilController.mjs';

const ProfilRoutes = Router();

// Ambil semua kategori
ProfilRoutes.get('/', getAllProfil);

// Ambil kategori by ID
ProfilRoutes.get('/:id', getProfilById);

// Buat Kategori Baru
ProfilRoutes.post('/', createProfil);

// Update Profil
ProfilRoutes.put('/:id', updateProfil);

// Delete Profil
ProfilRoutes.delete('/:id', deteleProfil);

export default ProfilRoutes;
