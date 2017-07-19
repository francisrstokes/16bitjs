const chai = require('chai');
const expect = chai.expect;

const cleanup = require('../../../../src/assembler/preprocessor/stages/cleanup');

describe('assembler/preprocessor/stages/cleanup.js', () => {
  it('getDataTable(ins)', () => {
    const str = `
abc 123, cs       ;fvksnvkjsndvljds      
XYZ         
               sldd 344, 345 ; abc 123, 4
      ddv
`;
    const res = cleanup(str, 0);
    expect(res).to.deep.equal([
      'abc 123, cs',
      'XYZ',
      'sldd 344, 345',
      'ddv'
    ]);
  });
});