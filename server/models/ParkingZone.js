const pool = require('../config/db');

const ParkingZone = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM parking_zones');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM parking_zones WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const [result] = await pool.query('INSERT INTO parking_zones SET ?', data);
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    await pool.query('UPDATE parking_zones SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
  },

  async delete(id) {
    await pool.query('DELETE FROM parking_zones WHERE id = ?', [id]);
    return { id };
  }
};

module.exports = ParkingZone;
