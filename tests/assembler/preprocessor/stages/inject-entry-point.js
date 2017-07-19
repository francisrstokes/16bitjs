const chai = require('chai');
const expect = chai.expect;

const injectEntryPoint = require('../../../../src/assembler/preprocessor/stages/inject-entry-point');

const ins = [
  '.data',
  '.abc string 123',
  '.def 42',
  '.text',
  '.global main:',
  'main:',
  'hlt'
];

describe('assembler/preprocessor/stages/inject-entry-point.js', () => {
  it('injectEntryPoint(ins)', () => {
    const res = injectEntryPoint(ins);
    expect(res).to.deep.equal([
      'ldv a, main:',
      'jmr a',
      'main:',
      'hlt'
    ]);
  });
});