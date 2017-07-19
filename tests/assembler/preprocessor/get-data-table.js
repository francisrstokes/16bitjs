const chai = require('chai');
const expect = chai.expect;

const getDataTable = require('../../../src/assembler/preprocessor/get-data-table');
const cleanup = require('../../../src/assembler/preprocessor/stages/cleanup');

describe('assembler/preprocessor/get-data-table.js', () => {
  it('getDataTable(ins)', () => {
    const str = `
.data
.xyz string "abc"
.abc 20
.hello_world size 100
.text
.global main:
main:
ldv a, .abc
hlt
`;

    const ins = cleanup(str);
    const res = getDataTable(ins, 0);
    expect(res).to.deep.equal({
      '.xyz': {
        type: 2,
        address: 0,
        size: 4,
        data: 'abc'
      },
      '.abc': {
        type: 0,
        address: 4,
        size: 1,
        data: 20
      },
      '.hello_world': {
        type: 1,
        address: 5,
        size: 100,
        data: 100
      }
    });
  });
});