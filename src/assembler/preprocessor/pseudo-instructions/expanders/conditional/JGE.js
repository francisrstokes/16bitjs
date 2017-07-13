const {
  getInstructionArguments,
  uniqueLabel,
  getUsableRegister
} = require('../../utils');


module.exports = (instruction) => {
  const [source, address] = getInstructionArguments(instruction);
  const label = uniqueLabel();
  const jumpRegister = getUsableRegister(source);

  return [
    `JLT ${source}, ${label}`,
    `LDV ${jumpRegister}, ${address}`,
    `PSH ${jumpRegister}`,
    'RET',
    `${label}`
  ];
}