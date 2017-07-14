const { getInstructionArguments } = require('../../utils');
module.exports = (instruction) => {
  const [register, value] = getInstructionArguments(instruction);
  return [
    `LDV ${register}, (${value} >> 8)`,
    `LSF ${register}, 4`,
    `LSF ${register}, 4`,
    'PSH B',
    `LDV B, (${value} & 0b0000000011111111)`,
    `ADD ${register}, B`,
    'POP B'
  ];
};
