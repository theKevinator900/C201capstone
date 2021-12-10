const { getCart, createCart, updateCart, deleteCarts, addToCart } = require('../controllers/cartCon')
const express = require('express')
const router = express.Router()

router.route('/').post(createCart).get(getCart).patch(updateCart).delete(deleteCarts)
router.route('/:id').put(addToCart)

module.exports = router;