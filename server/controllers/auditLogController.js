const Audit = require("../models/AuditLog");

const validId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Database operation failed.",
  });
};

// Get All
exports.getAll = (req, res) => {
  Audit.getAll((err, results) => {
    if (err) return handleError(res, err);

    res.status(200).json({
      success: true,
      data: results,
    });
  });
};

// Get By ID
exports.getById = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid audit log ID." });
  }

  Audit.getById(id, (err, results) => {
    if (err) return handleError(res, err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Audit log not found." });
    }

    res.status(200).json({ success: true, data: results[0] });
  });
};

// Create
exports.create = (req, res) => {
  const data = req.body;

  Audit.create(data, (err, result) => {
    if (err) return handleError(res, err);

    res.status(201).json({
      success: true,
      data: result,
    });
  });
};

// Update
exports.update = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid audit log ID." });
  }

  Audit.update(id, req.body, (err, result) => {
    if (err) return handleError(res, err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Audit log not found." });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};

// Delete
exports.delete = (req, res) => {
  const id = req.params.id;

  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid audit log ID." });
  }

  Audit.delete(id, (err, result) => {
    if (err) return handleError(res, err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Audit log not found." });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  });
};

// Report with Users
exports.report = (req, res) => {
  Audit.getWithUsers((err, results) => {
    if (err) return handleError(res, err);

    res.status(200).json({
      success: true,
      data: results,
    });
  });
};
