const Vehicle = require('../models/Vehicle');

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.createVehicle = async (req, res) => {
    try {
        const { user_id, license_plate, vehicle_type } = req.body;
        if (!user_id || !license_plate || !vehicle_type) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        const insertId = await Vehicle.create(req.body);
        res.status(201).json({ success: true, data: { vehicle_id: insertId, ...req.body } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const affectedRows = await Vehicle.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.status(200).json({ success: true, message: 'Vehicle updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const affectedRows = await Vehicle.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.status(200).json({ success: true, message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.getVehicleOwnerReport = async (req, res) => {
    try {
        const report = await Vehicle.getVehiclesWithUsers();
        res.status(200).json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};