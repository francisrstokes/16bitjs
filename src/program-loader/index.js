const argv = require('yargs').argv;
const { fs, convertUint8ArrayToUint16Array } = require('../utils');
const sanityCheck = require('./sanity-check');

module.exports = (argv, memory) =>
  new Promise((resolve) => {
    sanityCheck(argv)
      .then(() => {
        fs.readFileAsync(argv.p)
          .then(result => new Uint8Array(result))
          .then(convertUint8ArrayToUint16Array)
          .then(program => {
            program.forEach((v, i) => {
              memory[i] = v;
            })
          })
          .then(resolve);
      });
  });
