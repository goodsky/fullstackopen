const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const cors = require('cors');
const express = require('express');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI)
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
app.use('/api/blogs/', blogsRouter);

app.use(middleware.errorHandler);

module.exports = app;