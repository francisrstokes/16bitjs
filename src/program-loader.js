const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const {convertUint8ArrayToUint16Array} = require('./utils');

module.exports = (argv, memory) =>
  () => new Promise((resolve, reject) => {
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