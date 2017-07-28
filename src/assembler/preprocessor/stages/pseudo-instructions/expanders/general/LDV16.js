const {
  getInstructionArguments,
  getUsableRegister
} = require('../../../../utils');

module.exports = (instruction) => {
  const [register, value] = getInstructionArguments(instruction);
  const mutableRegister = getUsableRegister(register);
  return [
    `LDV ${register}, (${value} >> 8)`,
    `LSF ${register}, 4`,
    `LSF ${register}, 4`,
    `PSH ${mutableRegister}`,
    `LDV ${mutableRegister}, (${value} & 0b11111111)`,
    `ADD ${register}, B`,
    `POP ${mutableRegister}`
  ];
};
