import database from '../config/database.mjs';

export const getAllUserEvents = async (req, res, next) => {
  try {
    const [results] = await database.query(`SELECT id, user_id, event_id, status, barcode, biografi, tanggal_pembelian FROM user_events`);
    res.json({ data: results });
  } catch (error) {
    console.log(`DB Error in get all UserEvents data` + error);
    next(error);
  }
};

export const getUserEventsById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query('SELECT id, user_id, event_id, status, barcode, biografi, tanggal_pembelian FROM user_events WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'UserEvents not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createUserEvents = async (req, res, next) => {
  const { user_id, event_id, status, barcode, biografi, tanggal_pembelian } = req.body;

  // VALIDASI SLUG DAN NAME
  if (!status || typeof status !== 'string' || status.length < 8) {
    return res.status(400).json({ error: 'status is required and must be at least 3 characters long.' });
  }
  if (!user_id || typeof user_id !== 'string' || user_id.length < 3) {
    return res.status(400).json({ error: 'Name is required and must be at least 3 characters long.' });
  }
  if (!event_id || typeof event_id !== 'string' || event_id.length < 3) {
    return res.status(400).json({ error: 'event_id is required and must be at least 3 characters long.' });
  }
  if (!barcode || typeof barcode !== 'string' || barcode.length < 3) {
    return res.status(400).json({ error: 'barcode is required and must be at least 3 characters long.' });
  }
  if (!biografi || typeof biografi !== 'string' || biografi.length < 3) {
    return res.status(400).json({ error: 'biografi is required and must be at least 3 characters long.' });
  }
  if (!tanggal_pembelian || typeof tanggal_pembelian !== 'string' || tanggal_pembelian.length < 3) {
    return res.status(400).json({ error: 'tanggal_pembelian is required and must be at least 3 characters long.' });
  }

  try {
    const [result] = await database.query('INSERT INTO user_events (user_id, event_id, status, barcode, biografi, tanggal_pembelian) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [user_id, event_id, status, barcode, biografi, tanggal_pembelian]);
    res.status(201).json({ message: 'UserEvents created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateUserEvents = async (req, res, next) => {
  const { id } = req.params;
  const { user_id, event_id, status, barcode, biografi, tanggal_pembelian } = req.body;

  // VALIDASI ID SLUG NAME
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  if (!user_id || typeof user_id !== 'string' || user_id.length < 0) {
    return res.status(400).json({ error: 'user_id is required and must be at least 3 characters long.' });
  }

  if (!event_id || typeof event_id !== 'string' || event_id.length < 0) {
    return res.status(400).json({ error: 'event_id is required and must be at least 3 characters long.' });
  }

  if (!status || typeof status !== 'string' || status.length < 8) {
    return res.status(400).json({ error: 'status is required and must be at least 8 characters long.' });
  }

  if (!barcode || typeof barcode !== 'string' || barcode.length < 0) {
    return res.status(400).json({ error: 'barcode is required.' });
  }

  if (!biografi || typeof biografi !== 'string' || biografi.length < 0) {
    return res.status(400).json({ error: 'biografi is required.' });
  }

  if (!tanggal_pembelian || typeof tanggal_pembelian !== 'string' || tanggal_pembelian.length < 0) {
    return res.status(400).json({ error: 'tanggal_pembelian is required.' });
  }

  if (!link_discord || typeof link_discord !== 'string' || link_discord.length < 0) {
    return res.status(400).json({ error: 'link_discord is required.' });
  }

  try {
    const [result] = await database.query('UPDATE user_events SET user_id = ?, event_id = ?, status = ?, barcode = ? WHERE id = ?', [user_id, event_id, status, barcode, biografi, tanggal_pembelian, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'UserEvents not found' });
    }
    res.json({ message: 'UserEvents updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deteleUserEvents = async (req, res, next) => {
  const { id } = req.params;

  // Validasi ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('DELETE FROM user_events WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'UserEvents not found' });
    }

    res.json({ message: 'UserEvents deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
