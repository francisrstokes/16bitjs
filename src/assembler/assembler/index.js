const instructionEncoder = require('./instruction-encoder');
const {
  getInstructionType,
  getInstructionArguments,
  validateInstruction
} = require('./assembler-utils');

module.exports = (instructions) => {
  const out = new Uint16Array(instructions.length);
  instructions
    .map(instruction => instruction.toUpperCase())
    .forEach((instruction, index) => {
      validateInstruction(instruction);
      const iType = getInstructionType(instruction);
      const iArgs = getInstructionArguments(instruction);
      const encoded = instructionEncoder[iType](iArgs);

      out[index] = encoded;
    });

  return new Buffer(out.buffer);
}