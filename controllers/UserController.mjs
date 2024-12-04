import database from '../config/database.mjs';

export const getAllUsers = async (req, res, next) => {
  try {
    const [results] = await database.query('SELECT id, nama, email, username FROM users');
    res.json({ data: results });
  } catch (error) {
    console.log('DB Error in get all Users data' + error);
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query('SELECT id, nama, email, username, biografi, profile_picture FROM users WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
