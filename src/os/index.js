const { OS } = require('../constants');
const stdout = require('./stdout');
const stdin = require('./stdin');

module.exports = (registers, memory) => {
  switch (registers.A) {
    case OS.STDOUT:
      stdout(registers.B, registers.C, memory);
      break;
    case OS.STDIN:
      registers.B = stdin();
      break;
    default:
  }
};
