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
    const halt = step();
    if (!halt) run();
  };

  const log = () => {
    let s = '';
    for (let i = 0; i < memory.length; i++) {
      s += memory[i].toString(16) + ' ';
      if (i > 0 && i % 16 === 0) s += '\n';
    }

    console.log('Memory:');
    console.log(s += '\n');
  };

  return {
    run,
    step,
    log
  };
};