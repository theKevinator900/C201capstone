const Cart = require('../models/Cart')
const mongoose = require('mongoose')
require('dotenv').config()

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
    new: process.env.custom_true,
    runValidators: process.env.custom_true
  })
  res.status(200).json({cart})
}

const addToCart = async (req, res) => {
  const oldCart = await Cart.find({});
  const oldProducts = oldCart[0].products
  let newItem = true;
  const {id: newID} = req.params

  for(product of oldProducts) {
    if(product.productID == newID){
      newItem = false;
    }
  }

  if(newItem){
    const newProducts = [
      ...oldProducts,
      {
        productID: req.params.id,
        quantity: 1
      }
    ]
  
    const newCart = await Cart.findOneAndUpdate({}, {products: newProducts}, {
      new: true,
      runValidators: true
    })
  
    return res.status(200).json(newCart)
  } else {
    const newProducts = oldProducts.map( (product) => {
      if(product.productID != newID) return product
      return {
        productID: req.params.id,
        quantity: Number(product.quantity) + 1
      }
    })
  

  
    const newCart = await Cart.findOneAndUpdate({}, {products: newProducts}, {
      new: true,
      runValidators: true
    })
  
    return res.status(200).json(newCart)
  }

}

const deleteCarts = async (req, res) => {
  const deleted = await Cart.deleteMany({})
  res.status(200).json({deleted})
}

module.exports = {getCart, createCart, updateCart, deleteCarts, addToCart}