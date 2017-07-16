const { OS } = require('../constants');
const stdout = require('./stdout');
const stdin = require('./stdin');

module.exports = (registers) => {
  switch (registers.A) {
    case OS.STDOUT:
      stdout(registers.B, registers.C);
      break;
    case OS.STDIN:
      registers.B = stdin();
      break;
  }
};