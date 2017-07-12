const {
  getInstructionArguments,
  uniqueLabel
} = require('../utils');

module.exports = (instruction) => {
  const [source, address] = getInstructionArguments(instruction);
  const firstCheck = uniqueLabel();
  const notEqual = uniqueLabel();

  return [
    `JGE ${source}, ${firstCheck}`,
    `LDV ${source}, ${notEqual}`,
    `PSH ${source}`,
    'RET',

    `${firstCheck}`,
    `SWP ${source}, A`,
    `JGE ${source}, ${address}`,
    `${notEqual}`
  ];
}