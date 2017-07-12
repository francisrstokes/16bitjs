const { getInstructionArguments } = require('../utils');

module.exports = (instruction) => {
  const [source, destination] = getInstructionArguments(instruction);
  return [
    `PSH ${source}`,
    `DIV ${source}, ${destination}`,
    `MOV ${destination}, ${source}`,
    `POP ${source}`
  ];
}