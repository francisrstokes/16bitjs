const argv = require('yargs').argv;
const readBf = require('./read-bf');
const parse = require('./parser');
const compile = require('./compiler');

const preprocessor = require('../../assembler/preprocessor');
const assembler = require('../../assembler/assembler');
const writeBinary = require('../../assembler/write-binary');

readBf(argv, console.error)
  .then(parse, console.error)
  .then(compile, console.error)
  .then(preprocessor, console.error)
  .then(assembler, console.error)
  .then(writeBinary(argv.o));
