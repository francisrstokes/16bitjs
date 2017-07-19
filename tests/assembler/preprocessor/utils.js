const chai = require('chai');
const expect = chai.expect;

const utils = require('../../../src/assembler/preprocessor/utils');

describe('assembler/preprocessor/utils.js', () => {
  it('unescapeCharacters(str)', () => {
    const str = '\\n\\r\\f';
    const esc = utils.unescapeCharacters(str);
    expect(esc).to.equal('\n\r\f');
  });
  it('getInstructionArguments(str)', () => {
    const ins = 'XYZ x, 20,    y, address:     ';
    const res = utils.getInstructionArguments(ins);
    expect(res).to.deep.equal(['x', '20', 'y', 'address:']);
  });
  it('getUsableRegister(...regList)', () => {
    let rl = ['b', 'C'];
    let res = utils.getUsableRegister(...rl);
    expect(res).to.deep.equal('D');
    rl = ['c', 'd'];
    res = utils.getUsableRegister(...rl);
    expect(res).to.deep.equal('B');
  });
  it('getUsableRegister(...regList)', () => {
    let rl = ['b', 'C'];
    let res = utils.getUsableRegister(...rl);
    expect(res).to.deep.equal('D');
    rl = ['c', 'd'];
    res = utils.getUsableRegister(...rl);
    expect(res).to.deep.equal('B');
  });
});