const Cart = require('../models/Cart')

const getCart = async (req, res) => {
  const cart = await Cart.find({})
  res.status(200).json({cart})
}

const createCart = async (req, res) => {
  const cart = await Cart.create({products: []})
  //! products: [ {productID, quanity}, {productID, quanity}, {productID, quanity} ]
  res.status(200).json({cart})
}

const updateCart = async (req, res) => {
  const cart = await Cart.findOneAndUpdate({}, req.body, {
    new: true,
    runValidators: true
  })
  res.status(200).json({cart})
}

const deleteCarts = async (req, res) => {
  const deleted = await Cart.deleteMany({})
  res.status(200).json({deleted})
}

module.exports = {getCart, createCart, updateCart, deleteCarts}