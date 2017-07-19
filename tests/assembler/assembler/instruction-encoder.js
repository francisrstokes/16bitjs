const chai = require('chai');
const expect = chai.expect;

const encode = require('../../../src/assembler/assembler/instruction-encoder');

describe('assembler/assembler/instruction-encoder.js', () => {
  it('encodeInstruction.MOV(args)', () => {
    const res = encode.MOV(['A', 'B']);
    expect(res).to.equal(0b1000000)
  });
  it('encodeInstruction.LDV(args)', () => {
    const res = encode.LDV(['A', 1]);
    expect(res).to.equal(0b1000001)
  });
  it('encodeInstruction.LDR(args)', () => {
    const res = encode.LDR(['B', 'C']);
    expect(res).to.equal(0b10010010)
  });
  it('encodeInstruction.LDM(args)', () => {
    const res = encode.LDM(['C', 3]);
    expect(res).to.equal(0b11100011)
  });
  it('encodeInstruction.ATH(args)', () => {
    const res = encode.ATH(['C', 'D', 0, 1, 0]);
    expect(res).to.equal(0b1000011100100);
  });
  it('encodeInstruction.CAL(args)', () => {
    const res = encode.CAL(['C']);
    expect(res).to.equal(0b100101);
  });
  it('encodeInstruction.JLT(args)', () => {
    const res = encode.JLT(['C', 'A']);
    expect(res).to.equal(0b100110);
  });
  it('encodeInstruction.RET(args)', () => {
    const res = encode.RET();
    expect(res).to.equal(0b111);
  });
  it('encodeInstruction.PSH(args)', () => {
    const res = encode.PSH(['D']);
    expect(res).to.equal(0b11001000);
  });
  it('encodeInstruction.POP(args)', () => {
    const res = encode.POP(['D']);
    expect(res).to.equal(0b111001);
  });
  it('encodeInstruction.SYS(args)', () => {
    const res = encode.SYS();
    expect(res).to.equal(0b1010);
  });
  it('encodeInstruction.HLT(args)', () => {
    const res = encode.HLT();
    expect(res).to.equal(0b1011);
  });
  it('encodeInstruction.JMP(args)', () => {
    const res = encode.JMP(['A', 0b1000000001]);
    expect(res).to.equal(0b1000000001001100);
  });
  it('encodeInstruction.JMR(args)', () => {
    const res = encode.JMR(['C']);
    expect(res).to.equal(0b101101);
  });
  it('encodeInstruction.LDA(args)', () => {
    const res = encode.LDA(['C', 0b10000001]);
    expect(res).to.equal(0b10000001101110);
  });
  it('encodeInstruction.LDP(args)', () => {
    const res = encode.LDP(['C', 'D']);
    expect(res).to.equal(0b11101111);
  });
});