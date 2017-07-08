const argv = require('yargs').argv;
const debug = require('./debugger');
const memory = require('./memory/memory');
const stack = require('./memory/stack');
const cpu = require('./cpu')(memory, stack);
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