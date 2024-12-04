import database from '../config/database.mjs';

export const getNotifications = async (req, res, next) => {
  try {
    const [results] = await database.query('SELECT * FROM notifications');
    res.json({ data: results });
  } catch (error) {
    console.log('DB Error in get all Notifications data' + error);
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  const { user_id, message, date } = req.body;

  try {
    const [result] = await database.query('INSERT INTO notifications (user_id, message, date) VALUES (?, ?, ?)', [user_id, message, date]);
    res.status(201).json({ message: 'Notification created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
