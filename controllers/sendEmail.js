require('dotenv').config();
const nodemailer = require('nodemailer')
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'laisha.stehr4@ethereal.email',
      pass: process.env.MAILERPASS
    }
  })

  let {products} = await Cart.findOne({})
  console.log(products);
  let productObjs = [];
  for(product of products) {
    const productObj = await Product.findById(product.productID)
    productObjs.push(productObj)
  }

  let grandTotal = 0;
  let shipping_fee = products.length * 2.57

  let info = await transporter.sendMail({
    to: 'kevin@kevin.kevin',
    from: 'Joe Biden',
    replyTo: 'something@else.idk',
    subject: 'Reciept',
    html: `<ul>
    ${productObjs.map( (product, i) => {
      grandTotal += product.price.split('$')[1] * products[i].quantity
      return `<li>${product.name}: ${product.price} x ${products[i].quantity} = $${product.price.split('$')[1] * products[i].quantity}</li>`
    }).join('')}
    <li> Shipping: ${shipping_fee} </li>
    </ul>
    <h1> Total: $${grandTotal + shipping_fee} </h1>`
  })

  res.json(info)
}

module.exports = sendEmail;