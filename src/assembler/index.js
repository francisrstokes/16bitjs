const argv = require('yargs').argv;

const preprocessor = require('./preprocessor');
const assembler = require('./assembler');
const readAsm = require('./read-asm');
const writeBinary = require('./write-binary');

readAsm(argv)
  .then(preprocessor)
  .then(assembler)
  .then(writeBinary(argv.o))