const express = require('express');
const morgan = require('morgan');

const xss = require('xss-clean');
const userRoute = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const globalErrorHandler = require('./controller/errorController');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitizer = require('express-mongo-sanitize');
const app = express();

app.use(helmet());

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requests from same API
const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 601000,
  message: 'Too many requests from the same IP please try again',
});
app.use('/api', limiter);
// Body parser, reading data from body to req.body
app.use(
  express.json({
    limit: '10Kb',
  }),
);
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'difficulty',
      'price',
      'maxGroupSize',
    ],
  }),
);
// Data sanitization againest NoSQL query injection
app.use(mongoSanitizer());
// Data sanitization against XSS
app.use(xss());
// Serving static files
app.use(express.static(`${__dirname}/public`));
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
