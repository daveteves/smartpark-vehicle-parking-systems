const ParkingZone = require("../models/ParkingZone");

const validId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Database operation failed.",
  });
};

exports.getAll = (req, res) => {
  ParkingZone.getAll((err, results) => {
    if (err) return handleError(res, err);
    res.status(200).json({ success: true, data: results });
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid parking zone ID." });
  }
  ParkingZone.getById(id, (err, results) => {
    if (err) return handleError(res, err);
    if (results.length === 0) {
      return res.status(404).json({ message: "Parking zone not found." });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};

exports.create = (req, res) => {
  ParkingZone.create(req.body, (err, result) => {
    if (err) return handleError(res, err);
    res.status(201).json({ success: true, data: result });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid parking zone ID." });
  }
  ParkingZone.update(id, req.body, (err, result) => {
    if (err) return handleError(res, err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Parking zone not found." });
    }
    res.status(200).json({ success: true, data: result });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  if (!validId(id)) {
    return res.status(400).json({ message: "Invalid parking zone ID." });
  }
  ParkingZone.delete(id, (err, result) => {
    if (err) return handleError(res, err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Parking zone not found." });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  });
};
