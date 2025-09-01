const express = require('express');
const { json } = require('stream/consumers');
const morgan = require('morgan');

const userRoute = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
