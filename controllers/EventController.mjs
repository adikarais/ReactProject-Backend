import database from '../config/database.mjs';

export const getAllEvents = async (req, res, next) => {
  try {
    const [results] = await database.query(`SELECT id, category_id , judul, deskripsi, tanggal, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tanggal_jual_mulai, tanggal_jual_akhir, tempat_duduk, harga, gambar FROM events`);
    res.json({ data: results });
  } catch (error) {
    console.log(`DB Error in get all Event data` + error);
    next(error);
  }
};

export const getEventsById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query(
      'SELECT id, category_id , judul, deskripsi, tanggal, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tanggal_jual_mulai, tanggal_jual_akhir, tempat_duduk, harga, gambar FROM events WHERE id = ?',
      [id]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createEvents = async (req, res, next) => {
  const { category_id, judul, deskripsi, tanggal, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tanggal_jual_mulai, tanggal_jual_akhir, tempat_duduk, harga, gambar } = req.body;

  // VALIDASI SLUG DAN NAME
  if (!category_id || typeof category_id !== 'string' || category_id.length < 0) {
    return res.status(400).json({ error: 'category_id  is required.' });
  }
  if (!deskripsi || typeof deskripsi !== 'string' || deskripsi.length < 0) {
    return res.status(400).json({ error: 'deskripsi is required.' });
  }
  if (!judul || typeof judul !== 'string' || judul.length < 0) {
    return res.status(400).json({ error: 'judul is required.' });
  }
  if (!tanggal || typeof tanggal !== 'DATE' || tanggal.length < 0) {
    return res.status(400).json({ error: 'tanggal is required.' });
  }
  if (!jam_mulai || typeof jam_mulai !== 'TIME') {
    return res.status(400).json({ error: 'jam_mulai is required.' });
  }
  if (!jam_selesai || typeof jam_selesai !== 'DATE') {
    return res.status(400).json({ error: 'jam_selesai is required.' });
  }
  if (!komunitas || typeof komunitas !== 'string' || komunitas.length < 0) {
    return res.status(400).json({ error: 'komunitas is required.' });
  }
  if (!jumlah_tiket || typeof jumlah_tiket !== 'BIGINT') {
    return res.status(400).json({ error: 'jumlah_tiket is required.' });
  }
  if (!tanggal_jual_mulai || typeof tanggal_jual_mulai !== 'DATE') {
    return res.status(400).json({ error: 'tanggal_jual_mulai is required.' });
  }
  if (!tanggal_jual_akhir || typeof tanggal_jual_akhir !== 'DATE') {
    return res.status(400).json({ error: 'tanggal_jual_akhir is required.' });
  }
  if (!tempat_duduk || typeof tempat_duduk !== 'TIME') {
    return res.status(400).json({ error: 'tempat_duduk is required.' });
  }
  if (!harga || typeof harga !== 'TIME') {
    return res.status(400).json({ error: 'harga is required.' });
  }
  if (!gambar || typeof gambar !== 'BIGINT' || gambar < 0) {
    return res.status(400).json({ error: 'tanggal is required.' });
  }

  try {
    const [result] = await database.query(
      'INSERT INTO events (category_id , judul, deskripsi, tanggal, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tanggal_jual_mulai, tanggal_jual_akhir, tempat_duduk, harga, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [category_id, judul, deskripsi, tanggal, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tanggal_jual_mulai, tanggal_jual_akhir, tempat_duduk, harga, gambar]
    );
    res.status(201).json({ message: 'Event created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateEvents = async (req, res, next) => {
  const { id } = req.params;
  const { category_id, judul, deskripsi, tanggal, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tanggal_jual_mulai, tanggal_jual_akhir, tempat_duduk, harga, gambar } = req.body;

  // VALIDASI ID SLUG NAME
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  if (!category_id || typeof category_id !== 'string' || category_id.length < 0) {
    return res.status(400).json({ error: 'category_id  is required ' });
  }

  if (!deskripsi || typeof deskripsi !== 'string' || deskripsi.length < 0) {
    return res.status(400).json({ error: 'deskripsi is required ' });
  }

  if (!tanggal || typeof tanggal !== 'DATE') {
    return res.status(400).json({ error: 'tanggal is required ' });
  }

  if (!judul || typeof judul !== 'string') {
    return res.status(400).json({ error: 'judul is required ' });
  }

  if (!jam_mulai || typeof jam_mulai !== 'TIME') {
    return res.status(400).json({ error: 'jam_mulai is required ' });
  }

  if (!jam_selesai || typeof jam_selesai !== 'TIME') {
    return res.status(400).json({ error: 'jam_selesai is required ' });
  }

  if (!komunitas || typeof komunitas !== 'string' || komunitas.length < 0) {
    return res.status(400).json({ error: 'komunitas is required ' });
  }

  if (!jumlah_tiket || typeof jumlah_tiket !== 'BIGINT' || jumlah_tiket.length < 3) {
    return res.status(400).json({ error: 'jumlah_tiket is required ' });
  }

  if (!tanggal_jual_mulai || typeof tanggal_jual_mulai !== 'DATE' || tanggal_jual_mulai.length < 3) {
    return res.status(400).json({ error: 'tanggal_jual_mulai is required ' });
  }

  if (!tanggal_jual_akhir || typeof tanggal_jual_akhir !== 'DATE' || tanggal_jual_akhir.length < 3) {
    return res.status(400).json({ error: 'tanggal_jual_akhir is required ' });
  }

  if (!tempat_duduk || typeof tempat_duduk !== 'TIME' || tempat_duduk.length < 3) {
    return res.status(400).json({ error: 'tempat_duduk is required ' });
  }

  if (!harga || typeof harga !== 'TIME' || harga.length < 3) {
    return res.status(400).json({ error: 'harga is required ' });
  }

  if (!gambar || typeof gambar !== 'BIGINT') {
    return res.status(400).json({ error: 'gambar is required ' });
  }

  try {
    const [result] = await database.query(
      'UPDATE events SET category_id  = ?, judul = ?, deskripsi = ?, tanggal = ?, jam_mulai = ?, jam_selesai = ?, komunitas = ?, jumlah_tiket = ?, tanggal_jual_mulai = ?, tanggal_jual_akhir = ?, tempat_duduk = ?, harga = ?, gambar = ?, max_beli = ?, tempat_duduk = ? WHERE id = ?',
      [category_id, judul, deskripsi, tanggal, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tanggal_jual_mulai, tanggal_jual_akhir, tempat_duduk, harga, gambar, max_beli, tempat_duduk, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Events not found' });
    }
    res.json({ message: 'Events updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deteleEvents = async (req, res, next) => {
  const { id } = req.params;

  // Validasi ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('DELETE FROM events WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Events not found' });
    }

    res.json({ message: 'Events deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
