import database from '../config/database.mjs';

export const getAllPayments = async (req, res, next) => {
  try {
    const [results] = await database.query('SELECT id, user_id, ticket_id, method, status, total_harga, tanggal_pembayaran FROM payments');
    res.json({ data: results });
  } catch (error) {
    console.log('DB Error in get all Payments data' + error);
    next(error);
  }
};

export const getPaymentById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query('SELECT id, user_id, ticket_id, method, status, total_harga, tanggal_pembayaran FROM payments WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createPayment = async (req, res, next) => {
  const { user_id, ticket_id, method, status, total_harga, tanggal_pembayaran } = req.body;

  try {
    const [result] = await database.query('INSERT INTO payments (user_id, ticket_id, method, status, total_harga, tanggal_pembayaran) VALUES (?, ?, ?, ?, ?, ?)', [user_id, ticket_id, method, status, total_harga, tanggal_pembayaran]);
    res.status(201).json({ message: 'Payment created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updatePayment = async (req, res, next) => {
  const { id } = req.params;
  const { user_id, ticket_id, method, status, total_harga, tanggal_pembayaran } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('UPDATE payments SET user_id = ?, ticket_id = ?, method = ?, status = ?, total_harga = ?, tanggal_pembayaran = ? WHERE id = ?', [user_id, ticket_id, method, status, total_harga, tanggal_pembayaran, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deletePayment = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('DELETE FROM payments WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
