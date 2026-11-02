const db = require('../config/db');

exports.getAll = (cb) => db.query('SELECT * FROM IoT_Devices', cb);
exports.getById = (id, cb) => db.query('SELECT * FROM IoT_Devices WHERE id = ?', [id], cb);
exports.create = (data, cb) => db.query('INSERT INTO IoT_Devices SET ?', data, cb);
exports.update = (id, data, cb) => db.query('UPDATE IoT_Devices SET ? WHERE id = ?', [data, id], cb);
exports.delete = (id, cb) => db.query('DELETE FROM IoT_Devices WHERE id = ?', [id], cb);
