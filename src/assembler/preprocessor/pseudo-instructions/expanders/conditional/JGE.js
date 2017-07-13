const {
  getInstructionArguments,
  uniqueLabel
} = require('../../utils');

module.exports = (instruction) => {
  const [source, address] = getInstructionArguments(instruction);
  const label = uniqueLabel();
  return [
    `JLT ${source}, ${label}`,
    `LDV ${source}, ${address}`,
    `PSH ${source}`,
    'RET',
    `${label}`
  ];
}