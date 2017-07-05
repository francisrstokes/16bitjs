const argv = require('yargs').argv;
const sanityCheck = require('./sanity-check');

const memory = require('./memory');
const cpu = require('./cpu')(memory);
const loadProgram = require('./program-loader')(argv, memory);

sanityCheck(argv)
  .then(loadProgram)
  .then(cpu.run);