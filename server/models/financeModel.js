const db = require('../config/db'); 

exports.getpayments = (callback) => { 
    const sql = "SELECT * FROM Payments"; 
    db.query(sql, callback); 
}; 

exports.getPayment_id = (id, callback) => { 
    const sql = "SELECT * FROM Payments WHERE payment_id = ?"; 
    db.query(sql, [id], callback); 
}; 

exports.addPayment = (data, callback) => { 
    const sql = `INSERT INTO Payments (session_id, amount_due, amount_paid, method, status) VALUES (?,?,?,?,?)`; 
    db.query(sql, [ 
        data.session_id, 
        data.amount_due, 
        data.amount_paid, 
        data.method, 
        data.status || "Pending" 
    ], callback); 
}; 

exports.updatePayment = (id, data, callback) => { 
    const sql = `UPDATE Payments SET session_id = ?, amount_due = ?, amount_paid = ?, method = ?, status = ? WHERE Payment_id = ?`; 
    db.query(sql, [ 
        data.session_id, 
        data.amount_due, 
        data.amount_paid, 
        data.method, 
        data.status, 
        id 
    ], callback); 
}; 

exports.deletepayment = (id, callback) => { 
    const sql = "DELETE FROM Payments WHERE payment_id = ?"; 
    db.query(sql, [id], callback); 
}; 

exports.getViolations = (callback) => { 
    const sql = "SELECT * FROM Violations"; 
    db.query(sql, callback); 
}; 

exports.getViolations_id = (id, callback) => { 
    const sql = "SELECT * FROM Violations WHERE violation_id = ?"; 
    db.query(sql, [id], callback); 
}; 

exports.addViolation = (data, callback) => { 
    const sql = `
        INSERT INTO Violations (vehicle_id, session_id, violation_type, fine_amount, status) 
        VALUES (?,?,?,?,?)
    `; 
    db.query(sql, [ 
        data.vehicle_id, 
        data.session_id || null, 
        data.violation_type, 
        data.fine_amount, 
        data.status || "Unpaid" 
    ], callback); 
}; 

exports.updateViolation = (id, data, callback) => { 
    const sql = `
        UPDATE Violations 
        SET vehicle_id = ?, session_id = ?, violation_type = ?, fine_amount = ?, status = ? 
        WHERE violation_id = ?
    `; 
    db.query(sql, [ 
        data.vehicle_id, 
        data.session_id, 
        data.violation_type, 
        data.fine_amount, 
        data.status, 
        id 
    ], callback); 
}; 

exports.deleteViolation = (id, callback) => { 
    const sql = "DELETE FROM Violations WHERE violation_id = ?"; 
    db.query(sql, [id], callback); 
}; 

exports.getChargingSessions = (callback) => { 
    const sql = "SELECT * FROM Charging_Sessions"; 
    db.query(sql, callback); 
}; 

exports.getChargingSessions_id = (id, callback) => { 
    const sql = "SELECT * FROM Charging_Sessions WHERE charging_id = ?"; 
    db.query(sql, [id], callback); 
}; 

exports.addChargingSession = (data, callback) => { 
    const sql = `
        INSERT INTO Charging_Sessions (session_id, charger_id, start_time, end_time, energy_consumed_kwh, cost) 
        VALUES (?,?,?,?,?,?)
    `; 
    db.query(sql, [ 
        data.session_id, 
        data.charger_id, 
        data.start_time, 
        data.end_time || null, 
        data.energy_consumed_kwh || 0, 
        data.cost || 0 
    ], callback); 
}; 

exports.updateChargingSession = (id, data, callback) => { 
    const sql = `
        UPDATE Charging_Sessions 
        SET session_id = ?, charger_id = ?, start_time = ?, end_time = ?, energy_consumed_kwh = ?, cost = ? 
        WHERE charging_id = ?
    `; 
    db.query(sql, [ 
        data.session_id, 
        data.charger_id, 
        data.start_time, 
        data.end_time, 
        data.energy_consumed_kwh, 
        data.cost, 
        id 
    ], callback); 
}; 

exports.deleteChargingSession = (id, callback) => { 
    const sql = "DELETE FROM Charging_Sessions WHERE charging_id = ?"; 
    db.query(sql, [id], callback); 
}; 

exports.getFinanceReport = (callback) => { 
    const sql = `
        SELECT 
            p.payment_id, v.violation_id, cs.charging_id, 
            COALESCE(p.session_id, v.session_id, cs.session_id) AS session_id, 
            p.amount_due, p.amount_paid, p.method, p.status AS payment_status, 
            v.vehicle_id, v.violation_type, v.fine_amount, v.status AS violation_status, 
            cs.charger_id, cs.start_time, cs.end_time, cs.energy_consumed_kwh, cs.cost
        FROM Payments p 
        LEFT JOIN Violations v ON p.session_id = v.session_id 
        LEFT JOIN Charging_Sessions cs ON p.session_id = cs.session_id 
        
        UNION 
        
        SELECT 
            p.payment_id, v.violation_id, cs.charging_id, 
            COALESCE(p.session_id, v.session_id, cs.session_id), 
            p.amount_due, p.amount_paid, p.method, p.status, 
            v.vehicle_id, v.violation_type, v.fine_amount, v.status, 
            cs.charger_id, cs.start_time, cs.end_time, cs.energy_consumed_kwh, cs.cost 
        FROM Violations v 
        LEFT JOIN Payments p ON v.session_id = p.session_id 
        LEFT JOIN Charging_Sessions cs ON v.session_id = cs.session_id 
        WHERE p.payment_id IS NULL 
        
        UNION 
        
        SELECT 
            p.payment_id, v.violation_id, cs.charging_id, 
            COALESCE(p.session_id, v.session_id, cs.session_id), 
            p.amount_due, p.amount_paid, p.method, p.status, 
            v.vehicle_id, v.violation_type, v.fine_amount, v.status, 
            cs.charger_id, cs.start_time, cs.end_time, cs.energy_consumed_kwh, cs.cost 
        FROM Charging_Sessions cs 
        LEFT JOIN Payments p ON cs.session_id = p.session_id 
        LEFT JOIN Violations v ON cs.session_id = v.session_id
        WHERE p.payment_id IS NULL AND v.violation_id IS NULL
    `; 
    db.query(sql, callback); 
};
