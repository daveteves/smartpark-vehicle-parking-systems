const pool = require('../config/db');

const PromoCode = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM promo_codes');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM promo_codes WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const [result] = await pool.query('INSERT INTO promo_codes SET ?', data);
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    await pool.query('UPDATE promo_codes SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
  },

  async delete(id) {
    await pool.query('DELETE FROM promo_codes WHERE id = ?', [id]);
    return { id };
  }
};

module.exports = PromoCode;
