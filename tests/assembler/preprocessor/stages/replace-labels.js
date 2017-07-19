const chai = require('chai');
const expect = chai.expect;

const replaceLabels = require('../../../../src/assembler/preprocessor/stages/replace-labels');

const ins = [
  'ldv a, main:',
  'jmr a',
  'main:',
  'hlt'
];

describe('assembler/preprocessor/stages/replace-labels.js', () => {
  it('replaceLabels(ins)', () => {
    const res = replaceLabels(ins);
    expect(res).to.deep.equal([
      'ldv a, 2',
      'jmr a',
      'hlt'
    ]);
  });
});