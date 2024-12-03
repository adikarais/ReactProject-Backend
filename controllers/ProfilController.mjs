import database from '../config/database.mjs';

// export const getAllProfil = async (req, res, next) => {
//   try {
//     const [results] = await database.query(`SELECT id, slug, name FROM categories`);
//     res.json({ data: results });
//   } catch (error) {
//     console.log(`DB Error in get all Profil data` + error);
//     next(error);
//   }
// };
export const getAllProfil = async (req, res, next) => {
  try {
    const [results] = await database.query(`SELECT id, nama, email, password, img FROM profil`);
    res.json({ data: results });
  } catch (error) {
    console.log(`DB Error in get all Profil data` + error);
    next(error);
  }
};

// export const getProfilById = async (req, res, next) => {
//   const { id } = req.params;

//   if (!id || isNaN(id)) {
//     return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
//   }

//   try {
//     const [results] = await database.query('SELECT id, slug, name FROM categories WHERE id = ?', [id]);
//     if (results.length === 0) {
//       return res.status(404).json({ error: 'Profil not found' });
//     }
//     res.json(results[0]);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const getProfilById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query('SELECT id, nama, email, password, img FROM profil WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Profil not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const createProfil = async (req, res, next) => {
//   const { slug, name } = req.body;

//   // VALIDASI SLUG DAN NAME
//   if (!slug || typeof slug !== 'string' || slug.length < 3) {
//     return res.status(400).json({ error: 'Slug is required and must be at least 3 characters long.' });
//   }

//   if (!name || typeof name !== 'string' || name.length < 3) {
//     return res.status(400).json({ error: 'Name is required and must be at least 3 characters long.' });
//   }

//   try {
//     const [result] = await database.query('INSERT INTO categories (slug, name) VALUES (?, ?)', [slug, name]);
//     res.status(201).json({ message: 'Profil created successfully', id: result.insertId });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const createProfil = async (req, res, next) => {
  const { nama, email, password, img } = req.body;

  // VALIDASI SLUG DAN NAME
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'password is required and must be at least 3 characters long.' });
  }

  if (!nama || typeof nama !== 'string' || nama.length < 3) {
    return res.status(400).json({ error: 'Name is required and must be at least 3 characters long.' });
  }
  if (!email || typeof email !== 'string' || email.length < 3) {
    return res.status(400).json({ error: 'email is required and must be at least 3 characters long.' });
  }
  if (!img || typeof img !== 'string' || img.length < 3) {
    return res.status(400).json({ error: 'img is required and must be at least 3 characters long.' });
  }

  try {
    const [result] = await database.query('INSERT INTO categories (nama, email, password, img) VALUES (?, ?, ?, ?)', [nama, email, password, img]);
    res.status(201).json({ message: 'Profil created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const updateProfil = async (req, res, next) => {
//   const { id } = req.params;
//   const { slug, name } = req.body;

//   // VALIDASI ID SLUG NAME
//   if (!id || isNaN(id)) {
//     return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
//   }

//   if (!slug || typeof slug !== 'string' || slug.length < 3) {
//     return res.status(400).json({ error: 'Slug is required and must be at least 3 characters long.' });
//   }

//   if (!name || typeof name !== 'string' || name.length < 3) {
//     return res.status(400).json({ error: 'Name is required and must be at least 3 characters long.' });
//   }

//   try {
//     const [result] = await database.query('UPDATE categories SET slug = ?, name = ? WHERE id = ?', [slug, name, id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Profil not found' });
//     }
//     res.json({ message: 'Profil updated successfully' });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const updateProfil = async (req, res, next) => {
  const { id } = req.params;
  const { nama, email, password, img } = req.body;

  // VALIDASI ID SLUG NAME
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  if (!nama || typeof nama !== 'string' || nama.length < 0) {
    return res.status(400).json({ error: 'nama is required and must be at least 3 characters long.' });
  }

  if (!email || typeof email !== 'string' || email.length < 0) {
    return res.status(400).json({ error: 'email is required and must be at least 3 characters long.' });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'password is required and must be at least 8 characters long.' });
  }

  if (!img || typeof img !== 'string' || img.length < 0) {
    return res.status(400).json({ error: 'img is required.' });
  }

  try {
    const [result] = await database.query('UPDATE categories SET nama = ?, email = ?, password = ?, img = ? WHERE id = ?', [nama, email, password, img, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Profil not found' });
    }
    res.json({ message: 'Profil updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const deteleProfil = async (req, res, next) => {
//   const { id } = req.params;

//   // Validasi ID
//   if (!id || isNaN(id)) {
//     return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
//   }

//   try {
//     const [result] = await database.query('DELETE FROM categories WHERE id = ?', [id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Profil not found' });
//     }

//     res.json({ message: 'Profil deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
export const deteleProfil = async (req, res, next) => {
  const { id } = req.params;

  // Validasi ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('DELETE FROM categories WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Profil not found' });
    }

    res.json({ message: 'Profil deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ===============================================================================================================================
