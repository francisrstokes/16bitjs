const { readFile, writeFile, stat } = require('fs');
const fs = require('bluebird').promisifyAll({ readFile, writeFile, stat });

const leftPad = (str, pad = 4, padWith = '0') =>
  (str.length < pad)
    ? Array.apply(null, { length: pad - str.length })
      .reduce((padding) => padding + padWith, '') + str
    : str;

const arrayAsHex = (arr) => {
  let s = '';
  for (let i = 0; i < arr.length; i++) {
    const fourBitsPadded = leftPad(arr[i].toString(16));
    s += fourBitsPadded + ' ';
    if (((i + 1) % 15 === 0)) s += '\n';
  }
  return s;
};
const convertUint8ArrayToUint16Array = (u8) => {
  const u16 = new Uint16Array(u8.length / 2);
  u8.forEach((_, i) => {
    if (i % 2 !== 0) {
      u16[(i - 1) / 2] = u8[i - 1] | (u8[i] << 8);
    }
  });
  return u16;
};
const splitInstruction = (instruction) => [
  (instruction & 0xF),
  (instruction & 0b0000000000110000) >> 4,
  (instruction & 0b0000000011000000) >> 6,
  (instruction & 0b1111111100000000) >> 8
];

module.exports = {
  leftPad,
  arrayAsHex,
  convertUint8ArrayToUint16Array,
  splitInstruction,

  fs
};