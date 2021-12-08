require('dotenv').config();
require('express-async-errors')

const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

const connectDB = require('./db/connect')
const uploadImage = require('./controllers/uploadCon')
const productRouter = require('./routers/productRoute')
const cloudinary = require('cloudinary').v2;
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
  .use('/api/v1/product', productRouter)
  .post('/api/v1/uploads', uploadImage)


const start = async () => {
  try{
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`listening @ ${port}`))
  } catch (err) {
    console.error(err);
  }
}

start()