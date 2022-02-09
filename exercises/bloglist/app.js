const cors = require('cors');
const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const mongoDbOptions = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(config.MONGODB_URI, mongoDbOptions)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs/', middleware.tokenExtractor, middleware.userExtractor, blogsRouter);
app.use('/api/login/', loginRouter);
app.use('/api/users/', usersRouter);

app.use(middleware.errorHandler);

module.exports = app;
