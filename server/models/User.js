const db = require('../config/db');

class User {
    static async findAll() {
        const [rows] = await db.execute('SELECT user_id, first_name, last_name, email, role, created_at FROM Users');
        return rows;
    }

    static async create(userData) {
        const { first_name, last_name, email, password_hash, role } = userData;
        const [result] = await db.execute(
            'INSERT INTO Users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, email, password_hash, role]
        );
        return result.insertId;
    }

    static async update(id, userData) {
        const { first_name, last_name, role } = userData;
        const [result] = await db.execute(
            'UPDATE Users SET first_name = ?, last_name = ?, role = ? WHERE user_id = ?',
            [first_name, last_name, role, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM Users WHERE user_id = ?', [id]);
        return result.affectedRows;
    }

    static async getUserVehicleReport() {
        const [rows] = await db.execute(`
            SELECT u.first_name, u.last_name, v.license_plate, v.vehicle_type 
            FROM Users u 
            INNER JOIN Vehicles v ON u.user_id = v.user_id
        `);
        return rows;
    }
}

module.exports = User;