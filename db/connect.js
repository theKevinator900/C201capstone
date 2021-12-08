const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then( () => console.log('connected to the db'))
    .catch( (err) => console.error(err))
}

module.exports = connectDB