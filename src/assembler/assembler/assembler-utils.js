const { REGISTERS, INSTRUCTION_MAP } = require('../../constants');

const parseValues = (arg) => {
  if (typeof arg === 'string' && REGISTERS.indexOf(arg.toUpperCase()) !== -1) return arg;
  if (arg.startsWith('0x')) return parseInt(arg.substring(2), 16);
  if (arg.startsWith('0b')) return parseInt(arg.substring(2), 2);
  return parseInt(arg);
};
const getInstructionType = (instruction) => instruction.substring(0, 3);
const getInstructionArguments = (instruction) =>
  instruction
    .substring(3, instruction.length)
    .split(',')
    .map(arg => arg.trim())
    .filter(arg => arg !== '')
    .map(parseValues);

const validateInstruction = (instruction) => {
  const iType = getInstructionType(instruction).toUpperCase();
  const isValid = INSTRUCTION_MAP.indexOf(iType) !== -1;
  if (!isValid) {
    throw new Error(`[Error] Unknown instruction type ${iType}.\nFull instruction: ${instruction}`);
  }
};

module.exports = {
  getInstructionArguments,
  getInstructionType,
  validateInstruction
};
