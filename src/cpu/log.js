const {
  leftPad,
  arrayAsHex,
  splitInstruction
} = require('../utils');
const {INSTRUCTION_MAP} = require('../constants');

module.exports = {
  printInstruction: (instruction) => {
    const opcode = splitInstruction(instruction)[0];
    const namedOpcode = INSTRUCTION_MAP[opcode];
    console.log(`Instruction: (${namedOpcode}) ${leftPad(instruction.toString(2), 16)}`);
  },

  printMemory: (memory) => {
    console.log('Memory:');
    console.log(arrayAsHex(memory) + '\n');
  },

  printStack: (stack) => {
    console.log('Stack:');
    console.log(arrayAsHex(stack) + '\n');
  },

  printRegisters: (registers) => {
    const regs = Object.keys(registers)
      .reduce((outputStr, registerName) =>
        `${outputStr}${registerName}: ${leftPad(registers[registerName].toString(16))}\t`,
      '');
    console.log('Registers:');
    console.log(regs + '\n');
  }
}