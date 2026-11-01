const db = require('../config/db');
class Membership {
  static async findAll() { const [rows] = await db.execute('SELECT * FROM Memberships'); return rows; }
  static async findById(id) { const [rows] = await db.execute('SELECT * FROM Memberships WHERE membership_id = ?', [id]); return rows[0]; }
  static async create(data) { const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`INSERT INTO Memberships (${k.join(', ')}) VALUES (${k.map(()=> '?').join(', ')})`, v); return r.insertId; }
  static async update(id,data){ const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`UPDATE Memberships SET ${k.map(x=>`${x}=?`).join(', ')} WHERE membership_id=?`, [...v,id]); return r.affectedRows; }
  static async delete(id){ const [r]=await db.execute('DELETE FROM Memberships WHERE membership_id=?',[id]); return r.affectedRows; }
  static async getWithUsers(){ const [rows]=await db.execute('SELECT m.*, u.first_name, u.last_name FROM Memberships m INNER JOIN Users u ON m.user_id = u.user_id'); return rows; }
}
module.exports = Membership;
