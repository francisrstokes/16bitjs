const fs = require('../utils').fs;

module.exports = (filename) =>
  (binBuffer) => fs
    .writeFileAsync(filename, binBuffer)
    .then(() => {
      console.log(`Sucessfully assembled to binary file ${filename}`);
    });
