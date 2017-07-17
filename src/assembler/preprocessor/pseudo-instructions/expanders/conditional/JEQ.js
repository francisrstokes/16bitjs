const {
  getInstructionArguments,
  uniqueLabel,
  getUsableRegister
} = require('../../../utils');

module.exports = (instruction) => {
  const [source, addressRegister] = getInstructionArguments(instruction);
  const mutableRegister = getUsableRegister(source, addressRegister);

  const firstCheck = uniqueLabel();
  const equal = uniqueLabel();
  const notEqual = uniqueLabel();

  return [
    `PSH ${mutableRegister}`,                   // Push mr [mr]

    `PSH ${addressRegister}`,                   // Push ar [ar, mr]
    `LDV16 ${addressRegister}, ${firstCheck}`,
    `LDV16 ${mutableRegister}, ${notEqual}`,

    `JGE ${source}, ${addressRegister}`,
    `JMR ${mutableRegister}`,

    `${firstCheck}`,
    `LDV16 ${addressRegister}, ${equal}`,
    `SWP A, ${source}`,
    `JGE ${source}, ${addressRegister}`,

    `SWP A, ${source}`,
    `JMR ${mutableRegister}`,

    `${equal}`,
    `SWP A, ${source}`,
    `POP ${addressRegister}`,                 // Pop ar [mr]
    `POP ${mutableRegister}`,                 // Pop mr []
    `JMR ${addressRegister}`,

    `${notEqual}`,
    `POP ${addressRegister}`,                 // Pop ar [mr]
    `POP ${mutableRegister}`                  // Pop mr []
  ];
}
