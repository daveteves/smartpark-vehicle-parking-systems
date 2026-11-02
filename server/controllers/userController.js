const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        if (!first_name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'Missing fields' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        
        const insertId = await User.create({ first_name, last_name, email, password_hash, role });
        res.status(201).json({ success: true, data: { user_id: insertId, first_name, email, role } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const affectedRows = await User.update(req.params.id, req.body);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'User updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const affectedRows = await User.delete(req.params.id);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.getReport = async (req, res) => {
    try {
        const report = await User.getUserVehicleReport();
        res.status(200).json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};