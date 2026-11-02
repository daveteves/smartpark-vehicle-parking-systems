const db = require('../config/db');
class AuditLog {
  static async findAll() { const [rows] = await db.execute('SELECT * FROM Audit_Logs'); return rows; }
  static async findById(id) { const [rows] = await db.execute('SELECT * FROM Audit_Logs WHERE log_id = ?', [id]); return rows[0]; }
  static async create(data) { const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`INSERT INTO Audit_Logs (${k.join(', ')}) VALUES (${k.map(()=> '?').join(', ')})`, v); return r.insertId; }
  static async update(id,data){ const k=Object.keys(data); const v=Object.values(data); const [r]=await db.execute(`UPDATE Audit_Logs SET ${k.map(x=>`${x}=?`).join(', ')} WHERE log_id=?`, [...v,id]); return r.affectedRows; }
  static async delete(id){ const [r]=await db.execute('DELETE FROM Audit_Logs WHERE log_id=?',[id]); return r.affectedRows; }
  static async getWithUsers(){ const [rows]=await db.execute('SELECT a.*, u.first_name, u.last_name FROM Audit_Logs a LEFT JOIN Users u ON a.user_id = u.user_id'); return rows; }
}
module.exports = AuditLog;
