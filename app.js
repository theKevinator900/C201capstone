require('dotenv').config();
require('express-async-errors')

const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

const connectDB = require('./db/connect')
const uploadImage = require('./controllers/uploadCon')
const productRouter = require('./routers/productRoute')
const cartRouter = require('./routers/cartRoute')
const cloudinary = require('cloudinary').v2;
const notFoundMiddleware = require('./middleware/notFound')
cloudinary.config({ 
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const port = process.env.port || 3000

app
  .use(express.json(), express.urlencoded({extended: false}))
  .use(fileUpload({useTempFiles: true}))
  .use( '/', express.static('./public/addPage'))
  .use( '/store', express.static('./public/storePage'))
  .use('/api/v1/products', productRouter)
  .use('/api/v1/cart', cartRouter)
  .post('/api/v1/uploads', uploadImage)
  
  // .use(notFoundMiddleware)


const start = async () => {
  try{
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`listening @ ${port}`))
  } catch (err) {
    console.error(err);
  }
}

start()