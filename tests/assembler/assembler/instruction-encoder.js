/* global describe it:true */
const chai = require('chai');
const expect = chai.expect;

const encode = require('../../../src/assembler/assembler/instruction-encoder');

describe('assembler/assembler/instruction-encoder.js', () => {
  it('encodeInstruction.MVR(args)', () => {
    const res = encode.MVR(['A', 'B']);
    expect(res).to.equal(0b1000000)
  });
  it('encodeInstruction.MVV(args)', () => {
    const res = encode.MVV(['A', 1, 3]);
    expect(res).to.equal(0b111000001)
  });
  it('encodeInstruction.LDR(args)', () => {
    const res1 = encode.LDR(['B', 'C']);
    expect(res1).to.equal(0b10010010)
    const res2 = encode.LDR(['B', 'C', 1]);
    expect(res2).to.equal(0b110010010)
  });
  it('encodeInstruction.STA(args)', () => {
    const res = encode.STA(['C', 3]);
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
  it('encodeInstruction.JCP(args)', () => {
    const res = encode.JCP(['C', 'A', 'B', 2]);
    expect(res).to.equal(0b100100100110);
  });
  it('encodeInstruction.PSH(args)', () => {
    const res = encode.PSH(['D']);
    expect(res).to.equal(0b11000111);
  });
  it('encodeInstruction.POP(args)', () => {
    const res = encode.POP(['D']);
    expect(res).to.equal(0b111000);
  });
  it('encodeInstruction.JMP(args)', () => {
    const res = encode.JMP([0b1000000001]);
    expect(res).to.equal(0b10000000011001);
  });
  it('encodeInstruction.JMR(args)', () => {
    const res = encode.JMR(['C']);
    expect(res).to.equal(0b101010);
  });
  it('encodeInstruction.LDA(args)', () => {
    const res = encode.LDA(['C', 0b10000001]);
    expect(res).to.equal(0b10000001101011);
  });
  it('encodeInstruction.STR(args)', () => {
    const res1 = encode.STR(['C', 'D']);
    expect(res1).to.equal(0b11101100);

    const res2 = encode.STR(['C', 'D', 1]);
    expect(res2).to.equal(0b111101100);
  });

  it('encodeInstruction.NOA(args)', () => {
    const res1 = encode.NOA([0]);
    expect(res1).to.equal(0b1101);

    const res2 = encode.NOA([1]);
    expect(res2).to.equal(0b11101);

    const res3 = encode.NOA([2]);
    expect(res3).to.equal(0b101101);

    const res4 = encode.NOA([3]);
    expect(res4).to.equal(0b111101);
  });
});