const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error(`Unhandled error (${error.name})`, error.message);

  next(error);
};

const requestLogger = (request, response, next) => {
  logger.info(`${request.method} ${request.path} ${JSON.stringify(request.body)}`);

  next();
};

module.exports = {
  errorHandler,
  requestLogger,
};
