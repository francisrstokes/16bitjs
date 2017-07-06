const registers = require('./registers');
const decodeAndExecute = require('./decoder');
const {
  printMemory,
  printRegisters,
  printStack,
  printInstruction
} = require('./log');

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
    printInstruction(memory[registers.IP]);
    printRegisters(registers);
    printMemory(memory);
    printStack(stack);
  };

  return {
    run,
    step,
    log
  };
};