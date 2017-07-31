const fs = require('../../utils').fs;

module.exports = (argv) =>
  new Promise((resolve) => {
    if (!argv.i || !argv.o) {
      console.log('Usage: node src/compilers/bf -i {infile} -o {outfile}');
      process.exit(1);
    }

    fs.statAsync(argv.i)
      .then(stats => {
        if (stats.isFile()) {
          resolve();
        } else {
          throw new Error(`Brainfuck file ${argv.i} is not valid. Exiting...`);
        }
      });
  });
