const registers = require('../constants').REGISTERS;

const parseValues = (arg) => {
  // Contains a register name
  if (registers.indexOf(arg) !== -1) return arg;
  // Hex number
  if (arg.startsWith('0x')) return parseInt(arg.substring(2), 16);
  // Binary Number
  if (arg.startsWith('0b')) return parseInt(arg.substring(2), 2);
  // Decimal number
  return parseInt(arg);
};

const getInstructionType = (instruction) => instruction.substring(0, 3);
const getInstructionArguments = (instruction) => 
  instruction
    .substring(3, instruction.length)
    .split(',')
    .filter(arg => arg !== '')
    .map(arg => arg.trim())
    .map(parseValues);

module.exports = {
  getInstructionArguments,
  getInstructionType
};