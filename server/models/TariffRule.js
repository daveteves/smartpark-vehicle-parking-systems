const pool = require('../config/db');

const TariffRule = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM tariff_rules');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM tariff_rules WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const [result] = await pool.query('INSERT INTO tariff_rules SET ?', data);
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    await pool.query('UPDATE tariff_rules SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
  },

  async delete(id) {
    await pool.query('DELETE FROM tariff_rules WHERE id = ?', [id]);
    return { id };
  }
};

module.exports = TariffRule;
