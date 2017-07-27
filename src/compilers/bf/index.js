const argv = require('yargs').argv;
const readBf = require('./read-bf');
const parse = require('./parser');
const compile = require('./compiler');
const writeAsm = require('./write-asm');

readBf(argv, console.error)
  .then(parse, console.error)
  .then(compile, console.error)
  .then(writeAsm, console.error);
