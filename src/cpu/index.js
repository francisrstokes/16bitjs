const registers = require('./registers');
const decodeAndExecute = require('./decoder');

module.exports = (memory) => {
  const fetchInstruction = () => {
    return memory[registers.IP++];
  }

  const step = () => {
    const ins = fetchInstruction();
    return decodeAndExecute(ins, registers, memory);
  };

  const run = () => {
    const halt = step();
    if (!halt) run();
  };

  const log = () => {};

  return {
    run,
    step,
    log
  };
};