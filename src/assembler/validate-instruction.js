const {INSTRUCTION_MAP} = require('../constants');
const {getInstructionType} = require('./assembler-utils');

module.exports = (instruction) => {
  const iType = getInstructionType(instruction);
  const isValid = INSTRUCTION_MAP.indexOf(iType) !== -1;
  if (!isValid) {
    console.log(`[Error] Unknown instruction type ${iType}.\nFull instruction: ${instruction}`);
    process.exit(1);
  }
}