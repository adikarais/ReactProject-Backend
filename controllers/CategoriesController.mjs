import database from '../config/database.mjs';

export const getAllCategories = async (req, res, next) => {
  try {
    const [results] = await database.query('SELECT id, nama FROM categories');
    res.json({ data: results });
  } catch (error) {
    console.log('DB Error in get all Categories data' + error);
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [results] = await database.query('SELECT id, nama FROM categories WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  const { nama } = req.body;

  if (!nama || typeof nama !== 'string' || nama.length < 3) {
    return res.status(400).json({ error: 'Category name is required and must be at least 3 characters long.' });
  }

  try {
    const [result] = await database.query('INSERT INTO categories (nama) VALUES (?)', [nama]);
    res.status(201).json({ message: 'Category created successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { nama } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  if (!nama || typeof nama !== 'string' || nama.length < 3) {
    return res.status(400).json({ error: 'Category name is required and must be at least 3 characters long.' });
  }

  try {
    const [result] = await database.query('UPDATE categories SET nama = ? WHERE id = ?', [nama, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. It must be a number.' });
  }

  try {
    const [result] = await database.query('DELETE FROM categories WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
