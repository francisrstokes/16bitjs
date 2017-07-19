const chai = require('chai');
const expect = chai.expect;


const utils = require('../src/utils');

describe('utils.js', () => {
  it('leftPad(str, pad, padChar)', () => {
    // Default
    expect(utils.leftPad('F')).to.equal('000F');

    // Extended pad
    expect(utils.leftPad('F', 8)).to.equal('0000000F');

    // Different character
    expect(utils.leftPad('F', 4, 'X')).to.equal('XXXF');
  });

  it('arrayAsHex(arr)', () => {
    const mockMem = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];
    const expected = '0000\t0000 0001 0002 0003 0004 0005 0006 0007 0008 0009 000a 000b 000c 000d 000e 000f \n' +
                     '0010\t0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 001a 001b 001c 001d 001e 001f \n' +
                     '0020\t';
    expect(utils.arrayAsHex(mockMem)).to.equal(expected);
  });

  it('convertUint8ArrayToUint16Array(u8)', () => {
    const u8 = new Uint8Array(2);
    u8[0] = 0b10101010;
    u8[1] = 0b11111111;

    const expectedU16 = new Uint16Array(1);
    expectedU16[0] = 0b1111111110101010;
    expect(utils.convertUint8ArrayToUint16Array(u8)).to.deep.equal(expectedU16);
  });

  it('splitInstruction(ins)', () => {
    const ins = [
      0b10110010,         // LDR D, C
      0b1010101010000011  // LDM A, 0x2AA
    ];

    const splits = ins.map(utils.splitInstruction);

    expect(splits[0]).to.deep.equal([
      0b0010,
      0b11,
      0b10,
      0,
      0b10
    ]);

    expect(splits[1]).to.deep.equal([
      0b0011,
      0,
      0b10,
      0b10101010,
      0b1010101010
    ]);
  });
});