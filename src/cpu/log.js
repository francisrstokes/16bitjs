const {
  padHex,
  arrayAsHex
} = require('../utils');

module.exports = {
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
        `${outputStr}${registerName}: ${padHex(registers[registerName].toString(16))}\t`,
      '');
    console.log('Registers:');
    console.log(regs + '\n');
  }
}