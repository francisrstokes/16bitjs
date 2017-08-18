const fs = require('../../utils').fs;

module.exports = (argv) => {
  if (!argv.i || !argv.o) {
    console.log('Usage: node src/compilers/bf -i {infile} -o {outfile}');
    process.exit(1);
  }

  return fs.statAsync(argv.i)
    .then(stats => {
      if (!stats.isFile()) {
        throw new Error(`Brainfuck file ${argv.i} is not valid. Exiting...`);
      }
    })
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}
