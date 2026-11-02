const pool = require('../config/db');

const AuditLog = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Audit_Logs ORDER BY timestamp DESC');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Audit_Logs WHERE log_id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const [result] = await pool.query('INSERT INTO Audit_Logs SET ?', data);
    return { log_id: result.insertId, ...data };
  },

  async update(id, data) {
    await pool.query('UPDATE Audit_Logs SET ? WHERE log_id = ?', [data, id]);
    return { log_id: id, ...data };
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM Audit_Logs WHERE log_id = ?', [id]);
    return result.affectedRows;
  },

  async getWithUsers() {
    const [rows] = await pool.query(`
      SELECT
        a.log_id,
        a.user_id,
        u.first_name,
        u.last_name,
        a.action_type,
        a.description,
        a.ip_address,
        a.timestamp
      FROM Audit_Logs a
      LEFT JOIN Users u ON a.user_id = u.user_id
      ORDER BY a.timestamp DESC
    `);
    return rows;
  }
};

module.exports = AuditLog;
