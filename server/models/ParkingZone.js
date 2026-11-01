const db = require('../config/db');
class ParkingZone {
  static async findAll() { const [rows] = await db.execute('SELECT * FROM Parking_Zones'); return rows; }
  static async findById(id) { const [rows] = await db.execute('SELECT * FROM Parking_Zones WHERE zone_id = ?', [id]); return rows[0]; }
  static async create(data) { const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`INSERT INTO Parking_Zones (${k.join(', ')}) VALUES (${k.map(()=> '?').join(', ')})`, v); return r.insertId; }
  static async update(id,data){ const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`UPDATE Parking_Zones SET ${k.map(x=>`${x}=?`).join(', ')} WHERE zone_id=?`, [...v,id]); return r.affectedRows; }
  static async delete(id){ const [r]=await db.execute('DELETE FROM Parking_Zones WHERE zone_id=?',[id]); return r.affectedRows; }
}
module.exports = ParkingZone;
