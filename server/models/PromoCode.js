const db = require('../config/db');
class PromoCode {
  static async findAll() { const [rows] = await db.execute('SELECT * FROM Promo_Codes'); return rows; }
  static async findById(id) { const [rows] = await db.execute('SELECT * FROM Promo_Codes WHERE promo_id = ?', [id]); return rows[0]; }
  static async create(data) { const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`INSERT INTO Promo_Codes (${k.join(', ')}) VALUES (${k.map(()=> '?').join(', ')})`, v); return r.insertId; }
  static async update(id,data){ const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`UPDATE Promo_Codes SET ${k.map(x=>`${x}=?`).join(', ')} WHERE promo_id=?`, [...v,id]); return r.affectedRows; }
  static async delete(id){ const [r]=await db.execute('DELETE FROM Promo_Codes WHERE promo_id=?',[id]); return r.affectedRows; }
}
module.exports = PromoCode;
