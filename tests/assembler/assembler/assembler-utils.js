const chai = require('chai');
const expect = chai.expect;

const utils = require('../../../src/assembler/assembler/assembler-utils');

describe('assembler/assembler/assembler-utils.js', () => {
  it('getInstructionType(val)', () => {
    expect(utils.getInstructionType('ldv a, 1'))
      .to.equal('ldv');
  });
  it('getInstructionArguments(val)', () => {
    expect(utils.getInstructionArguments('ldv a, 1'))
      .to.deep.equal(['a', 1]);

    expect(utils.getInstructionArguments('ldv a,      0xF'))
      .to.deep.equal(['a', 15]);

    expect(utils.getInstructionArguments('ldv a,      0b10101010'))
      .to.deep.equal(['a', 170]);
  });
  it('validateInstruction(val)', () => {
    // Will crash if no sucess
    utils.validateInstruction('ldv a, 1');
  });
});