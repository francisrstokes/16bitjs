const { getInstructionArguments } = require('../utils');
module.exports = (instruction) => {
  const [register, value] = getInstructionArguments(instruction);
  return [
    `LDV ${register}, (${value} >> 8)`,
    'SFT A, 0, 8',
    'PSH B',
    `LDV B, (${value} & 0b0000000011111111)`,
    'ADD A, B',
    'POP B'
  ];
};
