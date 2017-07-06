const {REGISTERS} = require('../constants');

const parseValues = (arg) => {
  if (REGISTERS.indexOf(arg) !== -1) return arg;
  if (arg.startsWith('0x')) return parseInt(arg.substring(2), 16);
  if (arg.startsWith('0b')) return parseInt(arg.substring(2), 2);
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