const {
  leftPad,
  arrayAsHex,
  splitInstruction
} = require('../utils');
const { INSTRUCTION_MAP } = require('../constants');

const memory = require('../memory/memory');
const stack = require('../memory/stack');
const registers = require('../cpu/registers')

module.exports = () => {
  const instruction = memory[registers.IP];
  const opcode = splitInstruction(instruction)[0];
  const namedOpcode = INSTRUCTION_MAP[opcode];

  const regs = Object.keys(registers)
    .reduce((outputStr, registerName) =>
      `${outputStr}${registerName}: ${leftPad(registers[registerName].toString(16))}\t`,
    '');
  console.log(`Memory:\n${arrayAsHex(memory)}\n`);
  console.log(`Stack:\n${arrayAsHex(stack)}\n`);
  console.log(`Instruction: (${namedOpcode}) ${leftPad(instruction.toString(2), 16)}`);
  console.log(`Registers:\n${regs}\n`);
};