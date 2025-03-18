const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

//orders

router.get('/products', orderController.getProducts);
router.get('/estimate', orderController.getShippingEstimate);//cep parametro

router.get('/order', orderController.getOrder);

module.exports = router;