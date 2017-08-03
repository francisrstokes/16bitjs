const { getInstructionArguments } = require('../../../../utils');

module.exports = (instruction) => {
  const [destination, address] = getInstructionArguments(instruction);
  return [`STA ${destination}, ${address}`];
}