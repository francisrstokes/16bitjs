const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [destination, value] = getInstructionArguments(instruction);
  return [`MVV ${destination}, ${value}, 0`];
}