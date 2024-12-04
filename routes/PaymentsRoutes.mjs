import { Router } from 'express';
import { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment } from '../controllers/PaymentsController.mjs';

const PaymentsRoutes = Router();

// Ambil semua payments
PaymentsRoutes.get('/', getAllPayments);

// Ambil payment by ID
PaymentsRoutes.get('/:id', getPaymentById);

// Buat payment baru
PaymentsRoutes.post('/', createPayment);

// Update payment
PaymentsRoutes.put('/:id', updatePayment);

// Hapus payment
PaymentsRoutes.delete('/:id', deletePayment);

export default PaymentsRoutes;
