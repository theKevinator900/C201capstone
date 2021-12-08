const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: [true, 'This item already exists']
  },
  price: {
    type: String,
    required: [true, 'Please provide a price']
  },
  image: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Product', ProductSchema)