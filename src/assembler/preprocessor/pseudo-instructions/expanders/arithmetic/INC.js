const { getInstructionArguments } = require('../../utils');

module.exports = (instruction) => {
  const [destination] = getInstructionArguments(instruction);
  return [`ATH ${destination}, 0, 4, 0, 0`];
}