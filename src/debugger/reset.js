const registers = require('../cpu/registers');
const { MEM_SIZE, STACK_SIZE } = require('../constants');
const $memory = require('../memory');
const memory = $memory.memory;
const stack = $memory.stack(registers).raw;

module.exports = () => {
  memory.fill(0, 0, MEM_SIZE);
  stack.fill(0, 0, STACK_SIZE);
  Object.keys(registers).forEach(key => {
    registers[key] = 0;
  });
}
