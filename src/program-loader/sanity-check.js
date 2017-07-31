const fs = require('../utils').fs;

module.exports = (argv) =>
  new Promise((resolve) => {
    if (!argv.p) {
      console.log('Usage: node src -p {binary executable} [--step]\n');
      console.log('step:\t[Optional] Enables debug mode');
      process.exit(1);
    }

    fs
      .statAsync(argv.p)
      .then(stats => {
        if (stats.isFile()) {
          resolve();
        } else {
          throw new Error(`Program file ${argv.p} is not valid. Exiting...`);
        }
      })
  });