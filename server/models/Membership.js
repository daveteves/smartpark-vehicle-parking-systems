const pool = require('../config/db');

const Membership = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM memberships');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM memberships WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const [result] = await pool.query('INSERT INTO memberships SET ?', data);
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    await pool.query('UPDATE memberships SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
  },

  async delete(id) {
    await pool.query('DELETE FROM memberships WHERE id = ?', [id]);
    return { id };
  }
};

module.exports = Membership;
