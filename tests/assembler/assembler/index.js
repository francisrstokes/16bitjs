const chai = require('chai');
const expect = chai.expect;

const assembler = require('../../../src/assembler/assembler');
const preprocessor = require('../../../src/assembler/preprocessor');

const mock = `
.data
  .a_string string 'abcde'
  .a_value 0x55
.text
  .global main:
main:
  ldv a, 10
  hlt
`;

const expected = new Uint16Array(11);

[
  513,
  10,
  2561,
  61,
  'a'.charCodeAt(0),
  'b'.charCodeAt(0),
  'c'.charCodeAt(0),
  'd'.charCodeAt(0),
  'e'.charCodeAt(0),
  0,
  0x55,
  0
].forEach((x, i) => expected[i] = x);

describe('assembler/assembler (main)', () => {
  it('assembler (main step)', () => {
    const processed = preprocessor(mock);
    const assembledArray = assembler(processed);
    expect(assembledArray).to.deep.equal(expected);
  });
});
