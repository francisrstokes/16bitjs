const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const argv = require('yargs').argv;
const sanityCheck = require('./sanity-check');

const preprocessor = require('./preprocessor');
const assembler = require('./assembler');

sanityCheck(argv);

fs
  .readFileAsync(argv.i, 'utf8')
  .then(preprocessor)
  .then(assembler)
  .then(binBuffer => {
    fs
      .writeFileAsync(argv.o, binBuffer)
      .then(success => {
        console.log(`Sucessfully assembled to binary file ${argv.o}`);
      })
  });
  