const {
  OS,
  REGISTERS
} = require('../constants');
const getCallComponents = require('./get-call-components');
const stdout = require('./stdout');
const stdin = require('./stdin');

module.exports = (instruction, registers) => {
  const [callCode, rs, outputMode] = getCallComponents(instruction);
  switch (callCode) {
    case OS.STDOUT:
      stdout(registers[REGISTERS[rs]], outputMode);
      break;
    case OS.STDIN:
      registers[REGISTERS[rs]] = stdin();
      break;
  }
};