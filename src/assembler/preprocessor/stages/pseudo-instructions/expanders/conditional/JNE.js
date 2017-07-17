const {
  getInstructionArguments,
  uniqueLabel,
  getUsableRegister
} = require('../../../../utils');

module.exports = (instruction) => {
  const [source, addressRegister] = getInstructionArguments(instruction);
  const equal = uniqueLabel();
  const mutableRegister = getUsableRegister(source, addressRegister);

  return [
    `PSH ${mutableRegister}`,
    `LDV16 ${mutableRegister}, ${equal}`,

    `JEQ ${source}, ${mutableRegister}`,
    `POP ${mutableRegister}`,
    `JMR ${addressRegister}`,

    `${equal}`,
    `POP ${mutableRegister}`
  ];
}