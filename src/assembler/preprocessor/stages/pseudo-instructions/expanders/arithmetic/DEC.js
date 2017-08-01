const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const arguments = getInstructionArguments(instruction);
  const [destination] = getInstructionArguments(instruction);
  return [`MVR ${destination}, ${destination}, 255`];
}