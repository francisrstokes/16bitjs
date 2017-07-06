const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = (filename) =>
  (binBuffer) =>  fs
    .writeFileAsync(filename, binBuffer)
    .then(success => {
      console.log(`Sucessfully assembled to binary file ${filename}`);
    });
