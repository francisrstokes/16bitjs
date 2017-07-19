const fs = require('../utils').fs;

module.exports = (filename) =>
  (unit16buffer) => fs
    .writeFileAsync(filename, new Buffer(unit16buffer.buffer))
    .then(() => {
      console.log(`Sucessfully assembled to binary file ${filename}`);
    });
