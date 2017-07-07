const fs = require('../../utils').fs;

module.exports = (argv) =>
  new Promise((resolve, reject) => {
    if (!argv.i || !argv.o) {
      console.log('Usage: node src/assembler -i {infile} -o {outfile}');
      process.exit(1);
    }

    fs.statAsync(argv.i)
      .then(stats => {
        if (stats.isFile()) {
          resolve();
        } else {
          console.log(`ASM file ${argv.i} is not valid. Exiting...`);
          process.exit(1);
        }
      });
  });
