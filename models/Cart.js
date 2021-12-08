const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
    }
  }]
})

module.exports = mongoose.model('Cart', CartSchema)