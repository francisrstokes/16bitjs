const leftPad = (str, pad = 4, padWith = '0') => {
  if (str.length < pad) {
    return Array.apply(null, {length: pad - str.length}).reduce((padding) => padding + padWith, '') + str;
  }
  return str;
};
const arrayAsHex = (arr) => {
  let s = '';
  for (let i = 0; i < arr.length; i++) {
    const doubleAsHex = leftPad(arr[i].toString(16));
    s += doubleAsHex + ' ';
    if (((i+1) % 15 === 0)) s += '\n';
  }
  return s;
};
const convertUint8ArrayToUint16Array = (u8) => {
  const out16 = new Uint16Array(u8.length / 2);
  u8.forEach((value, i) => {
    if (i % 2 !== 0) {
      out16[(i-1)/2] = u8[i-1] | (value << 8);
    }
  });
  return out16;
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
  splitInstruction
};