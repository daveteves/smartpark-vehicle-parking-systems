const Finance = require("../models/financeModel");

const validId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Database operation failed."
  });
};

//Payment
exports.getPayments = (req, res) => {
  Finance.getPayments((err, results) => {
    if (err) return handleError(res, err);

    res.status(200).json({
      success: true,
      data: results
    });
  });
};

exports.getPaymentById = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid payment ID." });
  }

  Finance.getPaymentById(id, (err, results) => {
    if (err) return handleError(res, err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Payment not found." });
    }

    res.status(200).json({ success: true, data: results[0] });
  });
};

exports.addPayment = (req, res) => {
  const { session_id, amount_due, amount_paid, method, status } = req.body;

  if (
    !session_id ||
    amount_due == null ||
    amount_paid == null ||
    !["Cash", "Card", "Digital Wallet"].includes(method)
  ) {
    return res.status(400).json({ message: "Invalid payment information." });
  }

  if (
    !Number.isFinite(Number(amount_due)) ||
    !Number.isFinite(Number(amount_paid)) ||
    Number(amount_due) < 0 ||
    Number(amount_paid) < 0 ||
    (status && !["Pending", "Paid", "Failed"].includes(status))
  ) {
    return res.status(400).json({ message: "Invalid payment values." });
  }

  Finance.addPayment(req.body, (err, result) => {
    if (err) return handleError(res, err);

    res.status(201).json({
      success: true,
      message: "Payment added successfully.",
      payment_id: result.insertId
    });
  });
};

exports.updatePayment = (req, res) => {
  const id = req.params.id;
  const { session_id, amount_due, amount_paid, method, status } = req.body;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid payment ID." });
  }

  if (
    !session_id ||
    amount_due == null ||
    amount_paid == null ||
    !["Cash", "Card", "Digital Wallet"].includes(method) ||
    !["Pending", "Paid", "Failed"].includes(status) ||
    !Number.isFinite(Number(amount_due)) ||
    !Number.isFinite(Number(amount_paid)) ||
    Number(amount_due) < 0 ||
    Number(amount_paid) < 0
  ) {
    return res.status(400).json({ message: "Invalid payment information." });
  }

  Finance.updatePayment(id, req.body, (err, result) => {
    if (err) return handleError(res, err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Payment not found." });
    }

    res.status(200).json({ message: "Payment updated successfully." });
  });
};

exports.deletePayment = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid payment ID." });
  }

  Finance.deletePayment(id, (err, result) => {
    if (err) return handleError(res, err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Payment not found." });
    }

    res.status(200).json({ message: "Payment deleted successfully." });
  });
};


//Violations
exports.getViolations = (req, res) => {
  Finance.getViolations((err, results) => {
    if (err) return handleError(res, err);

    res.status(200).json({ success: true, data: results });
  });
};

exports.getViolationById = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid violation ID." });
  }

  Finance.getViolationById(id, (err, results) => {
    if (err) return handleError(res, err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Violation not found." });
    }

    res.status(200).json({ success: true, data: results[0] });
  });
};

exports.addViolation = (req, res) => {
  const { vehicle_id, violation_type, fine_amount, status } = req.body;

  if (
    !vehicle_id ||
    !violation_type ||
    fine_amount == null ||
    !Number.isFinite(Number(fine_amount)) ||
    Number(fine_amount) < 0 ||
    (status && !["Unpaid", "Paid", "Appealed"].includes(status))
  ) {
    return res.status(400).json({ message: "Invalid violation information." });
  }

  Finance.addViolation(req.body, (err, result) => {
    if (err) return handleError(res, err);

    res.status(201).json({
      message: "Violation added successfully.",
      violation_id: result.insertId
    });
  });
};

exports.updateViolation = (req, res) => {
  const id = req.params.id;
  const { vehicle_id, violation_type, fine_amount, status } = req.body;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid violation ID." });
  }

  if (
    !vehicle_id ||
    !violation_type ||
    fine_amount == null ||
    !Number.isFinite(Number(fine_amount)) ||
    Number(fine_amount) < 0 ||
    !["Unpaid", "Paid", "Appealed"].includes(status)
  ) {
    return res.status(400).json({ message: "Invalid violation information." });
  }

  Finance.updateViolation(id, req.body, (err, result) => {
    if (err) return handleError(res, err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Violation not found." });
    }

    res.status(200).json({ message: "Violation updated successfully." });
  });
};

exports.deleteViolation = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid violation ID." });
  }

  Finance.deleteViolation(id, (err, result) => {
    if (err) return handleError(res, err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Violation not found." });
    }

    res.status(200).json({ message: "Violation deleted successfully." });
  });
};


//Charging_Session
exports.getChargingSessions = (req, res) => {
  Finance.getChargingSessions((err, results) => {
    if (err) return handleError(res, err);

    res.status(200).json({ success: true, data: results });
  });
};

exports.getChargingSessionById = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid charging ID." });
  }

  Finance.getChargingSessionById(id, (err, results) => {
    if (err) return handleError(res, err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Charging session not found." });
    }

    res.status(200).json({ success: true, data: results[0] });
  });
};

exports.addChargingSession = (req, res) => {
  const {
    session_id, charger_id, start_time,
    energy_consumed_kwh, cost
  } = req.body;

  if (
    !session_id ||
    !charger_id ||
    !start_time ||
    (energy_consumed_kwh != null &&
      (!Number.isFinite(Number(energy_consumed_kwh)) ||
       Number(energy_consumed_kwh) < 0)) ||
    (cost != null &&
      (!Number.isFinite(Number(cost)) || Number(cost) < 0))
  ) {
    return res.status(400).json({ message: "Invalid charging information." });
  }

  Finance.addChargingSession(req.body, (err, result) => {
    if (err) return handleError(res, err);

    res.status(201).json({
      message: "Charging session added successfully.",
      charging_id: result.insertId
    });
  });
};

exports.updateChargingSession = (req, res) => {
  const id = req.params.id;
  const {
    session_id, charger_id, start_time,
    energy_consumed_kwh, cost
  } = req.body;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid charging ID." });
  }

  if (
    !session_id ||
    !charger_id ||
    !start_time ||
    !Number.isFinite(Number(energy_consumed_kwh)) ||
    Number(energy_consumed_kwh) < 0 ||
    !Number.isFinite(Number(cost)) ||
    Number(cost) < 0
  ) {
    return res.status(400).json({ message: "Invalid charging information." });
  }

  Finance.updateChargingSession(id, req.body, (err, result) => {
    if (err) return handleError(res, err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Charging session not found." });
    }

    res.status(200).json({ message: "Charging session updated successfully." });
  });
};

exports.deleteChargingSession = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid charging ID." });
  }

  Finance.deleteChargingSession(id, (err, result) => {
    if (err) return handleError(res, err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Charging session not found." });
    }

    res.status(200).json({ message: "Charging session deleted successfully." });
  });
};


exports.getFinanceReport = (req, res) => {
  Finance.getFinanceReport((err, results) => {
    if (err) return handleError(res, err);

    res.status(200).json({
      success: true,
      message: "Finance report retrieved successfully.",
      data: results
    });
  });
};
