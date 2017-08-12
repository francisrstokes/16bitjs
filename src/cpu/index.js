const registers = require('./registers');
const decodeAndExecute = require('./decoder');

module.exports = (_memory) => {
  const memory = _memory.memory;
  const stack = _memory.stack(registers);

  const fetchInstruction = () => {
    return memory[registers.IP++];
  }

  const step = () => {
    const ins = fetchInstruction();
    return decodeAndExecute(ins, registers, memory, stack);
  };

  const run = () => {
    if (!step()) setImmediate(run);
    else process.exit(0);
  };

  return {
    run,
    step
  };
};