const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(hpp());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'Hello, World!' });
});

module.exports = app;