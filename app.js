const express = require('express');
const morgan = require('morgan');

const userRoute = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
