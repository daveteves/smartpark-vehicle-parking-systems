const express = require('express'); const router = express.Router(); const c = require('../controllers/tariffRuleController');
router.get('/', c.getAllTariffRules); router.get('/report/zones', c.getTariffZoneReport); router.get('/:id', c.getTariffRuleById);
router.post('/', c.createTariffRule); router.put('/:id', c.updateTariffRule); router.delete('/:id', c.deleteTariffRule);
module.exports = router;
