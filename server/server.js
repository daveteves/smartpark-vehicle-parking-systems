const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const vehicleRoutes = require('./routes/vehicleRoutes');
const tariffRuleRoutes = require('./routes/tariffRuleRoutes');
const promoCodeRoutes = require('./routes/promoCodeRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const parkingSessionRoutes = require('./routes/parkingSessionRoutes');
const parkingZoneRoutes = require('./routes/parkingZoneRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');
const financeRoutes = require('./routes/financeRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/tariff-rules', tariffRuleRoutes);
app.use('/api/promo-codes', promoCodeRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/parking-zones', parkingZoneRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/user', userRoutes);
app.use('/api/parking-session', parkingSessionRoutes)

app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the SmartPark API' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
