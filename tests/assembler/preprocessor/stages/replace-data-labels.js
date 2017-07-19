const chai = require('chai');
const expect = chai.expect;

const replaceDataLabels = require('../../../../src/assembler/preprocessor/stages/replace-data-labels');

const dataTable = {
  '.abc': { address: 0 },
  '.def': { address: 1 }
};

const ins = [
  'ldv a, .abc',
  'jmp .def'
];

describe('assembler/preprocessor/stages/replace-data-labels.js', () => {
  it('replaceDataLabels(ins)', () => {
    const res = replaceDataLabels(ins, dataTable);
    expect(res).to.deep.equal([
      'ldv a, 0',
      'jmp 1'
    ]);
  });
});