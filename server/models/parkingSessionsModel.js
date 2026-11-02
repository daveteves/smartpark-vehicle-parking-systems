const db = require('../config/db');

const ParkingSessions = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM Parking_Sessions');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM Parking_Sessions WHERE session_id = ?',
            [id]
        );
        return rows[0];
    },

    create: async (data) => {
        const { vehicle_id, spot_id, entry_timestamp } = data;

        const [result] = await db.query(
            'INSERT INTO Parking_Sessions (vehicle_id, spot_id, entry_timestamp) VALUES (?, ?, ?)',
            [vehicle_id, spot_id, entry_timestamp]
        );

        return result.insertId;
    },

    vehicleExit: async (id, exit_timestamp) => {
        const [result] = await db.query(
            'UPDATE Parking_Sessions SET exit_timestamp = ?, status = "Completed" WHERE session_id = ? AND status = "Active"',
            [exit_timestamp, id]
        );

        return result.affectedRows > 0;
    },

    update: async (id, data) => {
        const { vehicle_id, spot_id, entry_timestamp, exit_timestamp, status } = data;

        const [result] = await db.query(
            'UPDATE Parking_Sessions SET vehicle_id = ?, spot_id = ?, entry_timestamp = ?, exit_timestamp = ?, status = ? WHERE session_id = ?',
            [vehicle_id, spot_id, entry_timestamp, exit_timestamp, status, id]
        );

        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const [result] = await db.query(
            'DELETE FROM Parking_Sessions WHERE session_id = ?',
            [id]
        );

        return result.affectedRows > 0;
    }
};

module.exports = ParkingSessions;