const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const argv = require('yargs').argv;

const sanityCheck = require('./sanity-check');
const preprocessor = require('./preprocessor');
const assembler = require('./assembler');
const writeBinary = require('./write-binary');

sanityCheck(argv)
  .then(() => {
    fs
      .readFileAsync(argv.i, 'utf8')
      .then(preprocessor)
      .then(assembler)
      .then(writeBinary(argv.o));
  });
