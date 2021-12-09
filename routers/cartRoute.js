const { getCart, createCart, updateCart, deleteCarts } = require('../controllers/cartCon')
const express = require('express')
const router = express.Router()

router.route('/').post(createCart).get(getCart).patch(updateCart).delete(deleteCarts)

module.exports = router;