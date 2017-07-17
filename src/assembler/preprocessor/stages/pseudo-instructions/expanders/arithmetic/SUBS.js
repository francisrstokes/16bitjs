const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [destination, source] = getInstructionArguments(instruction);
  return [`ATH ${destination}, ${source}, 1, 1, 0`];
}