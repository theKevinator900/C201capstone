const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  products: [{
    productID: {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: [true, 'please provide a quantity']
    }
  }]
})

module.exports = mongoose.model('Cart', CartSchema)