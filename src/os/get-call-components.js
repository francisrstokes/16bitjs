const {
  SYSTEM_CALL_SHIFT,
  OS
} = require('../constants');

module.exports = (call) => [
  (call & 0b0000000011110000) >> SYSTEM_CALL_SHIFT,
  (call & 0b0000001100000000) >> OS.REGISTER_SHIFT,
  (call & 0b0000110000000000) >> OS.MODE_SHIFT
];