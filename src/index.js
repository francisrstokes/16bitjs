const argv = require('yargs').argv;
const sanityCheck = require('./sanity-check');
const programLoader = require('./program-loader');

const memory = require('./memory');
const cpu = require('./cpu');//(memory);

const loadProgram = () => programLoader(argv, memory);

sanityCheck(argv)
  .then(loadProgram)
  .then(() => {
    cpu(memory).run();
  });




// Expectations
// 1: Program code will start at Address 0000 (0)
// 2: Maximum program size is the size of memory: 64 bytes (32 * 16 bits)
