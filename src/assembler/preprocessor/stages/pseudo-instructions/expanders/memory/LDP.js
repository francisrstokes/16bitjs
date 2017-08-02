const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [destination, source] = getInstructionArguments(instruction);
  return [`STR ${destination}, ${source}, 0`];
}