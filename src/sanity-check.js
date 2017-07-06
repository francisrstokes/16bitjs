const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = (argv) =>
  new Promise((resolve, reject) => {
    if (!argv.p) {
      console.log('Usage: node src -p {binary executable} [--step]\n');
      console.log('step:\t[Optional] Enables debug mode');
      process.exit(0);
    }

    fs
      .statAsync(argv.p)
      .then(stats => {
        if (stats.isFile()) {
          resolve();
        } else {
          console.log(`Program file ${argv.p} is not valid. Exiting...`);
          process.exit(1);
        }
      })
  });