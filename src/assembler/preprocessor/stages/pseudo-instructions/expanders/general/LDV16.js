const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [register, value] = getInstructionArguments(instruction);
  return [
    `MVI ${register}, (${value} & 0b11111111)`,
    `AUI ${register}, (${value} >> 8)`
  ];
};
