const argv = require('yargs').argv;
const sanityCheck = require('./sanity-check');

const debug = require('./debugger');
const memory = require('./memory/memory');
const stack = require('./memory/stack');
const cpu = require('./cpu')(memory, stack);
const loadProgram = require('./program-loader')(argv, memory);

const {EXECUTION_MODES} = require('./constants');
const executionMode = argv.step ? EXECUTION_MODES.STEP : EXECUTION_MODES.RUN;


sanityCheck(argv)
  .then(loadProgram)
  .then(() => {
    if (executionMode === EXECUTION_MODES.RUN) {
      cpu.run();
    } else {
      debug(cpu);
    }
  });