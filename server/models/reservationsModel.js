const db = require('.../config/db');

const Reservation = {
    getAll: async () => {
        const [rows] = await db.query(
            'SELECT*FROM Reservations'
        );
        return rows;
    },

    getByld: async (id) => {
        const [rows] = await db.query(
            'SELECT*FROM Reservations WHERE reservation_id = ?',
            [id]
        );
        return rows[0];
    },

    create: async (data) => {
        const {user_id, spot_id, start_time, end_time} = data;

        const [result] = await db.query(
            'INSERT INTO Reservations (user_id, spot_id, start_time, end_time) VALUES (?, ?, ?, ?)',
            [user_id, spot_id, start_time, end_time]
        );

        return result.insertId;
    },

    update: async (id, data) => {
        const {spot_id, start_time, end_time, status} = data;

        const [result] = await db.query(
            'UPDATE Reservations SET spot_id = ?, start_time = ?, end_time = ?, status = ? WHERE reservation_id = ?',
            [spot_id, start_time, end_time,status, id]
        );

        return result.affectedRows;
        },

        delete: async(id) => {
            const [result] = await db.query(
                'DELETE FROM Resrvations WHERE reservation_id = ?,'
                [id]
            );

            return result.affectedRows;


    }


};

module.exports = Reservations;