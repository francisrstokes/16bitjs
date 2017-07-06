const bin = (n) => n.toString(2);
const padHex = (hex) => {
  if (hex.length < 4) {
    return Array.apply(null, {length: 4-hex.length}).reduce((padding) => padding + '0', '') + hex;
  }
  return hex;
};
const arrayAsHex = (arr) => {
  let s = '';
  for (let i = 0; i < arr.length; i++) {
    const doubleAsHex = padHex(arr[i].toString(16));
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
  bin,
  padHex,
  arrayAsHex,
  convertUint8ArrayToUint16Array,
  splitInstruction
};