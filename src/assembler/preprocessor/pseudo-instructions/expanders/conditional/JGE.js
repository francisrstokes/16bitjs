const {
  getInstructionArguments,
  uniqueLabel,
  getUsableRegister
} = require('../../../utils');


module.exports = (instruction) => {
  const [source, addressRegister] = getInstructionArguments(instruction);
  const lessThan = uniqueLabel();
  const mutableRegister = getUsableRegister(source, addressRegister);

  return [
    `PSH ${mutableRegister}`,
    `LDV16 ${mutableRegister}, ${lessThan}`,

    `JLT ${source}, ${mutableRegister}`,
    `POP ${mutableRegister}`,
    `JMR ${addressRegister}`,

    `${lessThan}`,
    `POP ${mutableRegister}`
  ];
}