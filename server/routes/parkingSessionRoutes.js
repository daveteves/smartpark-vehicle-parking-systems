const express = require('express');
const router = express.Router();
const parkingSessionController = require('../controllers/parkingSessionController');

router.get('/', parkingSessionController.getAll);
router.get('/:id', parkingSessionController.getByld);
router.post('/', parkingSessionController.create);
router.put('/:id/exit', parkingSessionController.vehicleExit);
router.put('/:id', parkingSessionController.update);
router.delete('/:id', parkingSessionController.delete);

module.exports = router;