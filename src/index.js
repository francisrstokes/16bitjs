const argv = require('yargs').argv;
const sanityCheck = require('./sanity-check');

const memory = require('./memory/memory');
const stack = require('./memory/stack');
const cpu = require('./cpu')(memory, stack);
const loadProgram = require('./program-loader')(argv, memory);

sanityCheck(argv)
  .then(loadProgram)
  .then(cpu.run);