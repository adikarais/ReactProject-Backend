import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import AcaraRoutes from './routes/AcaraRoutes.mjs';
import ProfilRoutes from './routes/ProfilRoutes.mjs';
import CategoriesRoutes from './routes/CategoriesRoutes.mjs';
import FavoritesRoutes from './routes/FavoritesRoutes.mjs';
import NotificationsRoutes from './routes/NotificationsRoutes.mjs';
import PaymentsRoutes from './routes/PaymentsRoutes.mjs';
import UsersRoutes from './routes/UsersRoutes.mjs';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.send(`<h1>Hello world</h1>`);
});

// Wrapping routing dg app.use()
app.use('/api/v1/Profile', ProfilRoutes);
app.use('/api/v1/Acara', AcaraRoutes);
app.use('/api/v1/Kategori', CategoriesRoutes);
app.use('/api/v1/Favorit', FavoritesRoutes);
app.use('/api/v1/Notifikasi', NotificationsRoutes);
app.use('/api/v1/Pembayaran', PaymentsRoutes);
app.use('.api/v1/user', UsersRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} http://localhost:${PORT}/`);
});
