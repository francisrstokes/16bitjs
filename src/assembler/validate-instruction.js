const VALID_INSTRUCTIONS = require('../constants').VALID_INSTRUCTIONS;
const { getInstructionType } = require('./assembler-utils');

module.exports = (instruction) => {
  const iType = getInstructionType(instruction);
  const isValid = VALID_INSTRUCTIONS.indexOf(iType) !== -1;
  if (!isValid) {
    console.log(`[Error] Unknown instruction type ${iType}.\nFull instruction: ${instruction}`);
    process.exit(1);
  }
}