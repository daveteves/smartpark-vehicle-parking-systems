const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const vehicleRoutes = require('./routes/vehicleRoutes');
app.use('/api/vehicles', vehicleRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the SmartPark API' });
});

// You cann add routes na giinstuct nako. 
// e.g., app.use('/api/users', require('./routes/userRoutes'));
// e.g., app.use('/api/parking-zones', require('./routes/zoneRoutes'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});