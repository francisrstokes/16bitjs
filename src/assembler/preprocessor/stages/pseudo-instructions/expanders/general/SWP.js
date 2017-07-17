const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [source, destination] = getInstructionArguments(instruction);
  return [
    `PSH ${source}`,
    `MOV ${source}, ${destination}`,
    `POP ${destination}`
  ];
}