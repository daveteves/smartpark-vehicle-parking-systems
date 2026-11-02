 const db = require('../config/db');

const Vehicle = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM vehicles ORDER BY entry_time DESC');
    return rows;
  },

  create: async (plate_number, vehicle_type, slot_number) => {
    const [result] = await db.query(
      'INSERT INTO vehicles (plate_number, vehicle_type, slot_number) VALUES (?, ?, ?)',
      [plate_number, vehicle_type, slot_number]
    );
    return result.insertId;
  },

  exit: async (id) => {
    const [result] = await db.query(
      'UPDATE vehicles SET exit_time = NOW() WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
};

module.exports = Vehicle;
