const { getInstructionArguments } = require('../../../utils');

module.exports = (instruction) => {
  const [destination, source] = getInstructionArguments(instruction);
  return [`ATH ${destination}, ${source}, 8, 0, 0`];
}