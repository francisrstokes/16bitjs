const argv = require('yargs').argv;

const readAsm = require('./read-asm');
const preprocessor = require('./preprocessor');
const assembler = require('./assembler');
const writeBinary = require('./write-binary');

readAsm(argv)
  .then(preprocessor, console.error)
  .then(assembler, console.error)
  .then(writeBinary(argv.o), console.error);
