const express = require('express');
const { getProducts, createProduct, deleteProduct, getProduct } = require('../controllers/productCon');
const router = express.Router();

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').delete(deleteProduct).get(getProduct)

module.exports = router;