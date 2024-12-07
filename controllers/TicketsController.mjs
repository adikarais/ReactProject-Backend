import database from '../config/database.mjs';

export const getAllTickets = async (req, res, next) => {
  try {
    const [results] = await database.query(`SELECT id, user_id , event_id , status, barcode , tanggal_pembelian FROM tickets`);
    res.json({ data: results });
  } catch (error) {
    console.log(`DB Error in get all Tickets data` + error);
    next(error);
  }
};

export const getTicketsById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query('SELECT id, user_id , event_id , status, barcode , tanggal_pembelian FROM tickets WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Tickets not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createTickets = async (req, res, next) => {
  const { user_id, event_id, status, barcode, tanggal_pembelian } = req.body;

  // VALIDASI SLUG DAN NAME
  if (!status || typeof status !== 'string' || status.length < 8) {
    return res.status(400).json({ error: 'status is required and must be at least 3 characters long.' });
  }
  if (!user_id || typeof user_id !== 'string' || user_id.length < 3) {
    return res.status(400).json({ error: 'Name is required and must be at least 3 characters long.' });
  }
  if (!event_id || typeof event_id !== 'string' || event_id.length < 3) {
    return res.status(400).json({ error: 'event_id  is required and must be at least 3 characters long.' });
  }
  if (!barcode || typeof barcode !== 'string' || barcode.length < 3) {
    return res.status(400).json({ error: 'barcode  is required and must be at least 3 characters long.' });
  }
  if (!tanggal_pembelian || typeof tanggal_pembelian !== 'string' || tanggal_pembelian.length < 3) {
    return res.status(400).json({ error: 'tanggal_pembelian is required and must be at least 3 characters long.' });
  }

  try {
    const [result] = await database.query('INSERT INTO tickets (user_id , event_id , status, barcode , tanggal_pembelian) VALUES (?, ?, ?, ?, ?)', [user_id, event_id, status, barcode, tanggal_pembelian]);
    res.status(201).json({ message: 'Tickets created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateTickets = async (req, res, next) => {
  const { id } = req.params;
  const { user_id, event_id, status, barcode, tanggal_pembelian } = req.body;

  // VALIDASI ID SLUG NAME
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  if (!user_id || typeof user_id !== 'string' || user_id.length < 0) {
    return res.status(400).json({ error: 'user_id  is required and must be at least 3 characters long.' });
  }

  if (!event_id || typeof event_id !== 'string' || event_id.length < 0) {
    return res.status(400).json({ error: 'event_id  is required and must be at least 3 characters long.' });
  }

  if (!status || typeof status !== 'string' || status.length < 8) {
    return res.status(400).json({ error: 'status is required and must be at least 8 characters long.' });
  }

  if (!barcode || typeof barcode !== 'string' || barcode.length < 0) {
    return res.status(400).json({ error: 'barcode  is required.' });
  }

  if (!tanggal_pembelian || typeof tanggal_pembelian !== 'string' || tanggal_pembelian.length < 0) {
    return res.status(400).json({ error: 'tanggal_pembelian is required.' });
  }

  try {
    const [result] = await database.query('UPDATE tickets SET user_id  = ?, event_id  = ?, status = ?, barcode  = ?, tanggal_pembelian =? WHERE id = ?'[(user_id, event_id, status, barcode, tanggal_pembelian, id)]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tickets not found' });
    }
    res.json({ message: 'Tickets updated successfully' });
    tickets;
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deteleTickets = async (req, res, next) => {
  const { id } = req.params;

  // Validasi ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('DELETE FROM tickets WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tickets not found' });
    }

    res.json({ message: 'Tickets deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
