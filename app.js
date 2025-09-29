const express = require('express');
const morgan = require('morgan');

const userRoute = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const globalErrorHandler = require('.//controller/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} here in the server!`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
