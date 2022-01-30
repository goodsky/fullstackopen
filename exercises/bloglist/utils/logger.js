/* eslint-disable no-console */
const disableTestLogs = true;

const info = (...params) => {
  if (!(disableTestLogs && process.env.NODE_ENV === 'test')) {
    console.log(...params);
  }
};

const error = (...params) => {
  if (!(disableTestLogs && process.env.NODE_ENV === 'test')) {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
