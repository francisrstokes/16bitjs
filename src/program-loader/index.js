const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const convertUint8ArrayToUint16Array = (u8) => {
  const out16 = new Uint16Array(u8.length / 2);  
  u8.forEach((value, i) => {
    if (i % 2 !== 0) {
      out16[(i-1)/2] = u8[i-1] | (value << 8);
    }
  });
  return out16;
}

module.exports = (argv, memory) =>
  () => 
  new Promise((resolve, reject) => {
    fs
      .readFileAsync(argv.p)
      .then(result => new Uint8Array(result))
      .then(convertUint8ArrayToUint16Array)
      .then(program => {
        program.forEach((v, i) => {
          memory[i] = v;
        })
      })
      .then(resolve);
  });