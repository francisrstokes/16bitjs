const {
  getInstructionArguments,
  uniqueLabel,
  getUsableRegister
} = require('../../utils');

module.exports = (instruction) => {
  const [source, address] = getInstructionArguments(instruction);
  const jumpRegister = getUsableRegister();
  const firstCheck = uniqueLabel();
  const equal = uniqueLabel();
  const notEqual = uniqueLabel();

  return [
    `JGE ${source}, ${firstCheck}`,
    `LDV ${jumpRegister}, ${notEqual}`,
    `PSH ${jumpRegister}`,
    'RET',

    `${firstCheck}`,
    `SWP A, ${source}`,
    `JGE ${source}, ${equal}`,

    `SWP A, ${source}`,
    `LDV ${jumpRegister}, ${notEqual}`,
    `PSH ${jumpRegister}`,
    'RET',

    `${equal}`,
    `SWP A, ${source}`,
    `LDV ${jumpRegister}, ${address}`,
    `PSH ${jumpRegister}`,
    'RET',
    `${notEqual}`
  ];
}
