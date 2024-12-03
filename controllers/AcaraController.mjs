import database from '../config/database.mjs';

// export const getAllCategory = async (req, res, next) => {
//   try {
//     const [results] = await database.query(`SELECT id, slug, name FROM categories`);
//     res.json({ data: results });
//   } catch (error) {
//     console.log(`DB Error in get all category data` + error);
//     next(error);
//   }
// };
export const getAllAcara = async (req, res, next) => {
  try {
    const [results] = await database.query(
      `SELECT id, judul, img, deskripsi, tgl, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tgl_jual_mulai, tgl_jual_akhir, jam_jual_mulai, jam_jual_akhir, min_beli, max_beli, tempat_duduk, id_kategori, id_harga FROM acara`
    );
    res.json({ data: results });
  } catch (error) {
    console.log(`DB Error in get all category data` + error);
    next(error);
  }
};

// export const getCategoryById = async (req, res, next) => {
//   const { id } = req.params;

//   if (!id || isNaN(id)) {
//     return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
//   }

//   try {
//     const [results] = await database.query('SELECT id, slug, name FROM categories WHERE id = ?', [id]);
//     if (results.length === 0) {
//       return res.status(404).json({ error: 'Category not found' });
//     }
//     res.json(results[0]);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const getAcaraById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query(
      'SELECT id, judul, img, deskripsi, tgl, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tgl_jual_mulai, tgl_jual_akhir, jam_jual_mulai, jam_jual_akhir, min_beli, max_beli, tempat_duduk, id_kategori, id_harga FROM acara WHERE id = ?',
      [id]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const createCategory = async (req, res, next) => {
//   const { slug, name } = req.body;

//   // VALIDASI SLUG DAN NAME
//   if (!slug || typeof slug !== 'string' || slug.length < 3) {
//     return res.status(400).json({ error: 'Slug is required ' });
//   }

//   if (!name || typeof name !== 'string' || name.length < 3) {
//     return res.status(400).json({ error: 'Name is required ' });
//   }

//   try {
//     const [result] = await database.query('INSERT INTO categories (slug, name) VALUES (?, ?)', [slug, name]);
//     res.status(201).json({ message: 'Category created successfully', id: result.insertId });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const createAcara = async (req, res, next) => {
  const { judul, img, deskripsi, tgl, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tgl_jual_mulai, tgl_jual_akhir, jam_jual_mulai, jam_jual_akhir, min_beli, max_beli, tempat_duduk } = req.body;

  // VALIDASI SLUG DAN NAME
  if (!judul || typeof judul !== 'string' || judul.length < 0) {
    return res.status(400).json({ error: 'judul is required.' });
  }
  if (!deskripsi || typeof deskripsi !== 'string' || deskripsi.length < 0) {
    return res.status(400).json({ error: 'deskripsi is required.' });
  }
  if (!img || typeof img !== 'string' || img.length < 0) {
    return res.status(400).json({ error: 'img is required.' });
  }
  if (!tgl || typeof tgl !== 'DATE' || tgl.length < 0) {
    return res.status(400).json({ error: 'tgl is required.' });
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
  if (!tgl_jual_mulai || typeof tgl_jual_mulai !== 'DATE') {
    return res.status(400).json({ error: 'tgl_jual_mulai is required.' });
  }
  if (!tgl_jual_akhir || typeof tgl_jual_akhir !== 'DATE') {
    return res.status(400).json({ error: 'tgl_jual_akhir is required.' });
  }
  if (!jam_jual_mulai || typeof jam_jual_mulai !== 'TIME') {
    return res.status(400).json({ error: 'jam_jual_mulai is required.' });
  }
  if (!jam_jual_akhir || typeof jam_jual_akhir !== 'TIME') {
    return res.status(400).json({ error: 'jam_jual_akhir is required.' });
  }
  if (!min_beli || typeof min_beli !== 'BIGINT' || min_beli < 0) {
    return res.status(400).json({ error: 'tgl is required.' });
  }
  if (!max_beli || typeof max_beli !== 'BIGINT' || max_beli < 0) {
    return res.status(400).json({ error: 'tgl is required.' });
  }
  if (!tempat_duduk || typeof tempat_duduk !== 'BIGINT') {
    return res.status(400).json({ error: 'tgl is required.' });
  }
  if (!id_kategori || typeof id_kategori !== 'BIGINT') {
    return res.status(400).json({ error: 'id_kategori  is required.' });
  }
  if (!id_harga || typeof id_harga !== 'BIGINT') {
    return res.status(400).json({ error: 'id_harga  is required.' });
  }

  try {
    const [result] = await database.query(
      'INSERT INTO acara (judul, img, deskripsi, tgl, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tgl_jual_mulai, tgl_jual_akhir, jam_jual_mulai, jam_jual_akhir, min_beli, max_beli, tempat_duduk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [judul, img, deskripsi, tgl, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tgl_jual_mulai, tgl_jual_akhir, jam_jual_mulai, jam_jual_akhir, min_beli, max_beli, tempat_duduk]
    );
    res.status(201).json({ message: 'Category created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const updateCategory = async (req, res, next) => {
//   const { id } = req.params;
//   const { slug, name } = req.body;

//   // VALIDASI ID SLUG NAME
//   if (!id || isNaN(id)) {
//     return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
//   }

//   if (!slug || typeof slug !== 'string' || slug.length < 3) {
//     return res.status(400).json({ error: 'Slug is required ' });
//   }

//   if (!name || typeof name !== 'string' || name.length < 3) {
//     return res.status(400).json({ error: 'Name is required ' });
//   }

//   try {
//     const [result] = await database.query('UPDATE categories SET slug = ?, name = ? WHERE id = ?', [slug, name, id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Category not found' });
//     }
//     res.json({ message: 'Category updated successfully' });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const updateAcara = async (req, res, next) => {
  const { id } = req.params;
  const { judul, img, deskripsi, tgl, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tgl_jual_mulai, tgl_jual_akhir, jam_jual_mulai, jam_jual_akhir, min_beli, max_beli, tempat_duduk } = req.body;

  // VALIDASI ID SLUG NAME
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  if (!judul || typeof judul !== 'string' || judul.length < 0) {
    return res.status(400).json({ error: 'judul is required ' });
  }

  if (!deskripsi || typeof deskripsi !== 'string' || deskripsi.length < 0) {
    return res.status(400).json({ error: 'deskripsi is required ' });
  }

  if (!tgl || typeof tgl !== 'DATE') {
    return res.status(400).json({ error: 'tgl is required ' });
  }

  if (!img || typeof img !== 'string') {
    return res.status(400).json({ error: 'img is required ' });
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

  if (!tgl_jual_mulai || typeof tgl_jual_mulai !== 'DATE' || tgl_jual_mulai.length < 3) {
    return res.status(400).json({ error: 'tgl_jual_mulai is required ' });
  }

  if (!tgl_jual_akhir || typeof tgl_jual_akhir !== 'DATE' || tgl_jual_akhir.length < 3) {
    return res.status(400).json({ error: 'tgl_jual_akhir is required ' });
  }

  if (!jam_jual_mulai || typeof jam_jual_mulai !== 'TIME' || jam_jual_mulai.length < 3) {
    return res.status(400).json({ error: 'jam_jual_mulai is required ' });
  }

  if (!jam_jual_akhir || typeof jam_jual_akhir !== 'TIME' || jam_jual_akhir.length < 3) {
    return res.status(400).json({ error: 'jam_jual_akhir is required ' });
  }

  if (!min_beli || typeof min_beli !== 'BIGINT') {
    return res.status(400).json({ error: 'min_beli is required ' });
  }

  if (!max_beli || typeof max_beli !== 'BIGINT') {
    return res.status(400).json({ error: 'max_beli is required ' });
  }

  if (!tempat_duduk || typeof tempat_duduk !== 'BIGINT' || tempat_duduk.length < 3) {
    return res.status(400).json({ error: 'tempat_duduk is required ' });
  }

  try {
    const [result] = await database.query(
      'UPDATE acara SET judul = ?, img = ?, deskripsi = ?, tgl = ?, jam_mulai = ?, jam_selesai = ?, komunitas = ?, jumlah_tiket = ?, tgl_jual_mulai = ?, tgl_jual_akhir = ?, jam_jual_mulai = ?, jam_jual_akhir = ?, min_beli = ?, max_beli = ?, tempat_duduk = ? WHERE id = ?',
      [judul, img, deskripsi, tgl, jam_mulai, jam_selesai, komunitas, jumlah_tiket, tgl_jual_mulai, tgl_jual_akhir, jam_jual_mulai, jam_jual_akhir, min_beli, max_beli, tempat_duduk, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'acara not found' });
    }
    res.json({ message: 'acara updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const deteleCategory = async (req, res, next) => {
//   const { id } = req.params;

//   // Validasi ID
//   if (!id || isNaN(id)) {
//     return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
//   }

//   try {
//     const [result] = await database.query('DELETE FROM categories WHERE id = ?', [id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Category not found' });
//     }

//     res.json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const deteleAcara = async (req, res, next) => {
  const { id } = req.params;

  // Validasi ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('DELETE FROM acara WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'acara not found' });
    }

    res.json({ message: 'acara deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
