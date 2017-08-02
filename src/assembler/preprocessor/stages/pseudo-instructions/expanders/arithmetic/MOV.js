const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [destination, source] = getInstructionArguments(instruction);
  return [`MVR ${destination}, ${source}, 0`];
}