const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//products

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

router.get('/totals/:name', productController.totalsProducts);

module.exports = router;
