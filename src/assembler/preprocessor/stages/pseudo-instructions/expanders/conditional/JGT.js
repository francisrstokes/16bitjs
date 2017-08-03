const { getInstructionArguments } = require('../../../../utils');
const { JUMP } = require('../../../../../../constants');

module.exports = (instruction) => {
  const [r1, r2, addressRegister] = getInstructionArguments(instruction);
  return [`JCP ${r1}, ${r2}, ${addressRegister}, ${JUMP.GT}`];
};
