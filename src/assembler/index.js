const argv = require('yargs').argv;

const readAsm = require('./read-asm');
const preprocessor = require('./preprocessor');
const assembler = require('./assembler');
const writeBinary = require('./write-binary');

readAsm(argv)
  .then(preprocessor)
  .then(assembler)
  .then(writeBinary(argv.o))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
