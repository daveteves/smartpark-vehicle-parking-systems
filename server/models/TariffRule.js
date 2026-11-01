const db = require('../config/db');
class TariffRule {
  static async findAll() { const [rows] = await db.execute('SELECT * FROM Tariff_Rules'); return rows; }
  static async findById(id) { const [rows] = await db.execute('SELECT * FROM Tariff_Rules WHERE tariff_id = ?', [id]); return rows[0]; }
  static async create(data) { const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`INSERT INTO Tariff_Rules (${k.join(', ')}) VALUES (${k.map(()=> '?').join(', ')})`, v); return r.insertId; }
  static async update(id,data){ const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`UPDATE Tariff_Rules SET ${k.map(x=>`${x}=?`).join(', ')} WHERE tariff_id=?`, [...v,id]); return r.affectedRows; }
  static async delete(id){ const [r]=await db.execute('DELETE FROM Tariff_Rules WHERE tariff_id=?',[id]); return r.affectedRows; }
  static async getWithZones(){ const [rows]=await db.execute('SELECT t.*, z.zone_name FROM Tariff_Rules t INNER JOIN Parking_Zones z ON t.zone_id = z.zone_id'); return rows; }
}
module.exports = TariffRule;
