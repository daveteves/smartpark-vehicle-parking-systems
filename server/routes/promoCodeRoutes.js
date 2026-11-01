const express = require('express'); const router = express.Router(); const c = require('../controllers/promoCodeController');
router.get('/', c.getAllPromoCodes); router.get('/:id', c.getPromoCodeById); router.post('/', c.createPromoCode); router.put('/:id', c.updatePromoCode); router.delete('/:id', c.deletePromoCode);
module.exports = router;
