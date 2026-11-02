const db = require('../config/db');

exports.getAll = (cb) => db.query('SELECT * FROM RFID_Tags', cb);
exports.getById = (id, cb) => db.query('SELECT * FROM RFID_Tags WHERE id = ?', [id], cb);
exports.create = (data, cb) => db.query('INSERT INTO RFID_Tags SET ?', data, cb);
exports.update = (id, data, cb) => db.query('UPDATE RFID_Tags SET ? WHERE id = ?', [data, id], cb);
exports.delete = (id, cb) => db.query('DELETE FROM RFID_Tags WHERE id = ?', [id], cb);

