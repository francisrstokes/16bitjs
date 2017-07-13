const {
  getInstructionArguments,
  uniqueLabel,
  getUsableRegister
} = require('../../utils');

module.exports = (instruction) => {
  const [source, address] = getInstructionArguments(instruction);
  const jumpRegister = getUsableRegister();
  const notEqual = uniqueLabel();

  return [
    `JLT ${source}, ${notEqual}`,
    `SWP A, ${source}`,
    `JLT ${source}, ${notEqual}`,
    `SWP A, ${source}`,
    `LDV ${jumpRegister}, ${address}`,
    `PSH ${jumpRegister}`,
    'RET',
    `${notEqual}`
  ];
}
