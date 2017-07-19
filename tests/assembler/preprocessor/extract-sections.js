const chai = require('chai');
const expect = chai.expect;

const { extractDataSection, extractTextSection } = require('../../../src/assembler/preprocessor/extract-sections');

const ins = [
  '.data',
  '.abc string 123',
  '.def 42',
  '.text',
  '.global main:',
  'main:',
  'hlt'
];

describe('assembler/preprocessor/extract-sections.js', () => {
  it('extractDataSection(ins)', () => {
    const res = extractDataSection(ins);
    expect(res).to.deep.equal([
      '.abc string 123',
      '.def 42'
    ]);
  });

  it('extractTextSection(ins)', () => {
    const res = extractTextSection(ins);
    expect(res).to.deep.equal([
      '.global main:',
      'main:',
      'hlt'
    ]);
  });
});