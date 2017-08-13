const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [source, destination] = getInstructionArguments(instruction);
  return [
    `ATH ${destination}, ${source}, 10, 0, 0`,
    `ATH ${destination}, ${source}, 10, 1, 0`,
    `ATH ${destination}, ${source}, 10, 0, 0`
  ];
}