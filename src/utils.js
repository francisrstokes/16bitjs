const { readFile, writeFile, stat } = require('fs');
const fs = require('bluebird').promisifyAll({ readFile, writeFile, stat });

const {
  DESTINATION_SHIFT,
  SOURCE_SHIFT,
  ADDRESS_SHIFT,
  LONG_ADDRESS_SHIFT,
  MAX_INT
} = require('./constants');

const wrapMaxInt = (v) => {
  if (v < 0) {
    return MAX_INT + v;
  } else if (v > MAX_INT) {
    return v % MAX_INT;
  }
  return v;
};

const leftPad = (str, pad = 4, padWith = '0') =>
  (str.length < pad)
    ? Array.apply(null, { length: pad - str.length })
      .reduce((padding) => padding + padWith, '') + str
    : str;

const arrayAsHex = (arr, startingOffset = 0) => {
  let s = `${leftPad(startingOffset.toString(16))}\t`;
  for (let i = 0; i < arr.length; i++) {
    const fourBitsPadded = leftPad(arr[i].toString(16), 4);
    s += fourBitsPadded + ' ';

    if (((i + 1) % 16 === 0)) s += `\n${leftPad((startingOffset + i + 1).toString(16))}\t`;
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
  (instruction & 0b0000000000001111),
  (instruction & 0b0000000000110000) >> DESTINATION_SHIFT,
  (instruction & 0b0000000011000000) >> SOURCE_SHIFT,
  (instruction & 0b1111111100000000) >> ADDRESS_SHIFT,
  (instruction & 0b1111111111000000) >> LONG_ADDRESS_SHIFT
];

module.exports = {
  leftPad,
  arrayAsHex,
  convertUint8ArrayToUint16Array,
  splitInstruction,

  wrapMaxInt,

  fs
};