// enviroment variables
require('dotenv').config();

// core libs
const path = require('path');

// third party libs
const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const xss = require('xss-clean');

// server configuration
const config = require('./config');
const port = config.port;

// db connection
const connectDB = require('./config/db');
connectDB();

// express application
const app = express();

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parser
app.use(express.json());
// sanitize data
app.use(mongoSanitize());
// cookie parser
app.use(cookieParser());
// allow cross origin requests
app.use(cors());
// set security headers
app.use(helmet());
// prevent XSS attacks
app.use(xss());
// rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);
// prevent http param pollution
app.use(hpp());

// fill routes for express application
if (process.env.NODE_ENV === 'development') {
  app.use('/status', require('./routes/server-status'));
}

const server = app.listen(port, () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`.yellow);
  console.log(`App listening on port: ${port}`.yellow);
});

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Database Error: ${err.message}`);
  // close server & exit process
  server.close(() => process.exit(1));
});
