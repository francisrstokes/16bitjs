const {padHex} = require('../utils');

const arrayAsHex = (arr) => {
  let s = '';
  for (let i = 0; i < arr.length; i++) {
    const doubleAsHex = padHex(arr[i].toString(16));
    s += doubleAsHex + ' ';
    if (((i+1) % 15 === 0)) s += '\n';
  }
  return s;
};

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