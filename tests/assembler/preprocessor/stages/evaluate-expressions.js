const chai = require('chai');
const expect = chai.expect;

const evaluateExpressions = require('../../../../src/assembler/preprocessor/stages/evaluate-expressions');

const ins = [
  'abc (1 << 2) def',
  'xyz (1 + 2) abc'
];

describe('assembler/preprocessor/stages/evaluate-expressions.js', () => {
  it('evaluateExpressions(ins)', () => {
    const res = evaluateExpressions(ins);
    expect(res).to.deep.equal([
      'abc 4 def',
      'xyz 3 abc'
    ]);
  });
});