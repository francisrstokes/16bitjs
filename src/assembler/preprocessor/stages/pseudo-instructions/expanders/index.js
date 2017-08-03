const arithmetic = require('./arithmetic');
const bitwise = require('./bitwise');
const conditional = require('./conditional');
const general = require('./general');
const memory = require('./memory');

module.exports = Object.assign(
  {},
  arithmetic,
  bitwise,
  conditional,
  general,
  memory
);
