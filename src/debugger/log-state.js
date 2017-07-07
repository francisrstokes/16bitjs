const {
  leftPad,
  arrayAsHex,
  splitInstruction
} = require('../utils');
const { INSTRUCTION_MAP } = require('../constants');

const memory = require('../memory/memory');
const stack = require('../memory/memory');
const registers = require('../cpu/registers')

module.exports = () => {
  const instruction = memory[registers.IP];
  const opcode = splitInstruction(instruction)[0];
  const namedOpcode = INSTRUCTION_MAP[opcode];
  console.log(`Instruction: (${namedOpcode}) ${leftPad(instruction.toString(2), 16)}`);

  const regs = Object.keys(registers)
    .reduce((outputStr, registerName) =>
      `${outputStr}${registerName}: ${leftPad(registers[registerName].toString(16))}\t`,
    '');
  console.log(`Registers:\n${regs}\n`);
  console.log(`Memory:\n${arrayAsHex(memory)}\n`);
  console.log(`Stack:\n${arrayAsHex(stack)}\n`);
};