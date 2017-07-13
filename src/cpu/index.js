const registers = require('./registers');
const decodeAndExecute = require('./decoder');

module.exports = (memory, stack) => {
  const fetchInstruction = () => {
    return memory[registers.IP++];
  }

  const step = () => {
    const ins = fetchInstruction();
    return decodeAndExecute(ins, registers, memory, stack);
  };

  const run = () => {
    if (!step()) {
      setImmediate(run);
    }
    else {
      process.exit(0);
    }
  };

  return {
    run,
    step
  };
};