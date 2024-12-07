import database from '../config/database.mjs';

export const getAllUsers = async (req, res, next) => {
  try {
    const [results] = await database.query(`SELECT id, nama, email, password, username, biografi, link_facebook, link_discord, favorit_count, Userse_picture FROM users`);
    res.json({ data: results });
  } catch (error) {
    console.log(`DB Error in get all Users data` + error);
    next(error);
  }
};

export const getUsersById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query('SELECT id, nama, email, password, username, biografi, link_facebook, link_discord, favorit_count, Userse_picture FROM users WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Users not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createUsers = async (req, res, next) => {
  const { nama, email, password, username, biografi, link_facebook, link_discord, favorit_count, Userse_picture } = req.body;

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
  if (!username || typeof username !== 'string' || username.length < 3) {
    return res.status(400).json({ error: 'username is required and must be at least 3 characters long.' });
  }
  if (!biografi || typeof biografi !== 'string' || biografi.length < 3) {
    return res.status(400).json({ error: 'biografi is required and must be at least 3 characters long.' });
  }
  if (!link_facebook || typeof link_facebook !== 'string' || link_facebook.length < 3) {
    return res.status(400).json({ error: 'link_facebook is required and must be at least 3 characters long.' });
  }
  if (!link_discord || typeof link_discord !== 'string' || link_discord.length < 3) {
    return res.status(400).json({ error: 'link_discord is required and must be at least 3 characters long.' });
  }
  if (!favorit_count || typeof favorit_count !== 'INT' || favorit_count.length < 3) {
    return res.status(400).json({ error: 'favorit_count is required and must be at least 3 characters long.' });
  }
  if (!profile_picture || typeof profile_picture !== 'string' || profile_picture.length < 3) {
    return res.status(400).json({ error: 'profile_picture is required and must be at least 3 characters long.' });
  }

  try {
    const [result] = await database.query('INSERT INTO users (nama, email, password, username, biografi, link_facebook, link_discord, favorit_count, Userse_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      nama,
      email,
      password,
      username,
      biografi,
      link_facebook,
      link_discord,
      favorit_count,
      Userse_picture,
    ]);
    res.status(201).json({ message: 'Users created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateUsers = async (req, res, next) => {
  const { id } = req.params;
  const { nama, email, password, username, biografi, link_facebook, link_discord, favorit_count, Userse_picture } = req.body;

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

  if (!username || typeof username !== 'string' || username.length < 0) {
    return res.status(400).json({ error: 'username is required.' });
  }

  if (!biografi || typeof biografi !== 'string' || biografi.length < 0) {
    return res.status(400).json({ error: 'biografi is required.' });
  }

  if (!link_facebook || typeof link_facebook !== 'string' || link_facebook.length < 0) {
    return res.status(400).json({ error: 'link_facebook is required.' });
  }

  if (!link_discord || typeof link_discord !== 'string' || link_discord.length < 0) {
    return res.status(400).json({ error: 'link_discord is required.' });
  }

  if (!favorit_count || typeof favorit_count !== 'string' || favorit_count.length < 0) {
    return res.status(400).json({ error: 'favorit_count is required.' });
  }

  if (!profile_picture || typeof profile_picture !== 'string' || profile_picture.length < 0) {
    return res.status(400).json({ error: 'profile_picture is required.' });
  }

  try {
    const [result] = await database.query('UPDATE users SET nama = ?, email = ?, password = ?, username = ? WHERE id = ?', [nama, email, password, username, biografi, link_facebook, link_discord, favorit_count, Userse_picture, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Users not found' });
    }
    res.json({ message: 'Users updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deteleUsers = async (req, res, next) => {
  const { id } = req.params;

  // Validasi ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Users not found' });
    }

    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
