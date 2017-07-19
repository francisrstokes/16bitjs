const instructionEncoder = require('./instruction-encoder');
const {
  getInstructionType,
  getInstructionArguments,
  validateInstruction
} = require('./assembler-utils');
const {
  DIRECT_ASSIGNMENT,
  STRING_ASSIGNMENT
} = require('../../constants');

module.exports = (preprocessedObject) => {
  const { instructions, data } = preprocessedObject;
  const dataLabels = Object.keys(data);

  const dataSize = dataLabels
    .reduce((acc, cur) => acc + data[cur].size, 0);

  const out = new Uint16Array(instructions.length + dataSize);
  instructions
    .map(instruction => instruction.toUpperCase())
    .forEach((instruction, index) => {
      validateInstruction(instruction);
      const iType = getInstructionType(instruction);
      const iArgs = getInstructionArguments(instruction);
      const encoded = instructionEncoder[iType](iArgs);

      out[index] = encoded;
    });

  // Place the data into the assembled buffer
  dataLabels
    .forEach((label) => {
      const dataDescriptor = data[label];
      const index = dataDescriptor.address;
      if (dataDescriptor.type === DIRECT_ASSIGNMENT) {
        out[index] = dataDescriptor.data;
      } else if (dataDescriptor.type === STRING_ASSIGNMENT) {
        dataDescriptor.data
          .split('')
          .forEach((chr, i) => {
            out[index + i] = chr.charCodeAt(0);
          });
        out[index + dataDescriptor.size] = 0;
      }
    });

  return out;
}