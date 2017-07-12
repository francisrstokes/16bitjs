const {
  getInstructionArguments,
  uniqueLabel,
  getUsableRegister
} = require('../utils');

module.exports = (instruction) => {
  const [source, address] = getInstructionArguments(instruction);
  const equal = uniqueLabel();
  const jumpRegister = getUsableRegister(source);

  return [
    `JEQ ${source}, ${equal}`,
    `LDV ${jumpRegister}, ${address}`,
    `PSH ${jumpRegister}`,
    'RET',
    `${equal}`
  ];
}