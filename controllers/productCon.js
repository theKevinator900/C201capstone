const Product = require('../models/Product')

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(200).json(product)
}

const getProducts = async (req, res) => {
  const filters = req.body;
  const products = await Product.find(filters)
  res.status(200).json({results: products, length: products.length})
}

const deleteProduct = async (req, res) => {
  const {id} = req.params
  const product = await Product.findByIdAndDelete(id)
  res.status(200).json(product)
}

const getProduct = async (req, res) => {
  const {id} = req.params
  const product = await Product.findById(id)
  res.status(200).json(product)
}

module.exports = { getProduct, deleteProduct, getProducts, createProduct }