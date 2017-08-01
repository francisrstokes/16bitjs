const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [destination] = getInstructionArguments(instruction);
  return [`MVR ${destination}, ${destination}, 1`];
}