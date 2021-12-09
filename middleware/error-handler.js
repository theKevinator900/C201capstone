const { StatusCodes } = require('http-status-codes');

const errorHandler = async (err, req, res, next) => {
  //! create default error
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || 'something went wrong, try again later',
  };

  //! this handles any verification errors
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = 400;
  }

  //! this handles duplication errors
  if (err.code && err.code === 11000) {
    customError.msg = `entered ${Object.keys(err.keyValue)} ${Object.keys(
      err.keyValue
    )} already exists: ${Object.values(
      err.keyValue
    )} , please enter a new ${Object.keys(err.keyValue)}`;
    customError.statusCode = 400;
  }

  //! This is for any value that does not fit the type cast
  if (err.name === 'CastError') {
    customError.msg = `No item with id ${err.value}`;
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler
