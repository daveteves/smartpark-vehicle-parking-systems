const Tariff = require("../models/TariffRule");

const validId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;
const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Database operation failed." });
};

exports.getAll = (req, res) => {
  Tariff.getAll((err, results) => {
    if (err) return handleError(res, err);
    res.status(200).json({ success: true, data: results });
  });
};
exports.getById = (req, res) => {
  const id = req.params.id;
  if (!validId(id)) return res.status(400).json({ message: "Invalid tariff ID." });
  Tariff.getById(id, (err, results) => {
    if (err) return handleError(res, err);
    if (results.length === 0) return res.status(404).json({ message: "Tariff not found." });
    res.status(200).json({ success: true, data: results[0] });
  });
};
exports.create = (req, res) => {
  Tariff.create(req.body, (err, result) => {
    if (err) return handleError(res, err);
    res.status(201).json({ success: true, data: result });
  });
};
exports.update = (req, res) => {
  const id = req.params.id;
  if (!validId(id)) return res.status(400).json({ message: "Invalid tariff ID." });
  Tariff.update(id, req.body, (err, result) => {
    if (err) return handleError(res, err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Tariff not found." });
    res.status(200).json({ success: true, data: result });
  });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  if (!validId(id)) return res.status(400).json({ message: "Invalid tariff ID." });
  Tariff.delete(id, (err, result) => {
    if (err) return handleError(res, err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Tariff not found." });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  });
};
