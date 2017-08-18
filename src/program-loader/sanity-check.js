const fs = require('../utils').fs;

module.exports = (argv) => {
  if (!argv.p) {
    console.log('Usage: node src -p {binary executable} [--step]\n');
    console.log('step:\t[Optional] Enables debug mode');
    process.exit(1);
  }

  return fs
    .statAsync(argv.p)
    .then(stats => {
      if (!stats.isFile()) {
        throw new Error(`Program file ${argv.p} is not valid. Exiting...`);
      }
    })
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}
