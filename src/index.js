const argv = require('yargs').argv;
const debug = require('./debugger');
const memory = require('./memory');
const cpu = require('./cpu')(memory);
const loadProgram = require('./program-loader');
const debugMode = !!argv.step;

loadProgram(argv, memory)
  .then(() => {
    if (debugMode) {
      debug(cpu);
    } else {
      cpu.run();
    }
  });