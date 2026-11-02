const pool = require('../config/db');

const AuditLog = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM audit_logs WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const [result] = await pool.query('INSERT INTO audit_logs SET ?', data);
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    await pool.query('UPDATE audit_logs SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
  },

  async delete(id) {
    await pool.query('DELETE FROM audit_logs WHERE id = ?', [id]);
    return { id };
  }
};

module.exports = AuditLog;
