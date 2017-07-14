const {
  leftPad,
  arrayAsHex,
  splitInstruction
} = require('../utils');
const { INSTRUCTION_MAP, DEBUG } = require('../constants');

const registers = require('../cpu/registers')
const _memory = require('../memory');
const memory = _memory.memory;
const stack = _memory.stack(registers).raw;

const pagedMemory = require('./memory-pages');

module.exports = (memoryPage) => {
  const instruction = memory[registers.IP];
  const opcode = splitInstruction(instruction)[0];
  const namedOpcode = INSTRUCTION_MAP[opcode];

  const regs = Object.keys(registers)
    .reduce((outputStr, registerName) =>
      `${outputStr}${registerName}: ${leftPad(registers[registerName].toString(16))}\t`,
    '');
  console.log(`Memory:\n${pagedMemory(memory, memoryPage)}\nPage ${memoryPage + 1}/${DEBUG.NUM_PAGES}\n`);
  console.log(`Stack:\n${arrayAsHex(stack)}\n`);
  console.log(`Instruction: (${namedOpcode}) ${leftPad(instruction.toString(2), 16)}`);
  console.log(`Registers:\n${regs}\n`);

  process.stdout.write('(s)tep (e)xit (n)ext / (p)revious memory page >>> ');
};