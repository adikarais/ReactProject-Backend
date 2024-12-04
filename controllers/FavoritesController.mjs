import database from '../config/database.mjs';

export const getFavorites = async (req, res, next) => {
  try {
    const [results] = await database.query('SELECT * FROM favorites');
    res.json({ data: results });
  } catch (error) {
    console.log('DB Error in get all Favorites data' + error);
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  const { user_id, event_id } = req.body;

  try {
    const [result] = await database.query('INSERT INTO favorites (user_id, event_id) VALUES (?, ?)', [user_id, event_id]);
    res.status(201).json({ message: 'Added to favorites successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
