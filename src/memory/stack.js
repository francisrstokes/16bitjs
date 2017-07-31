const { STACK_SIZE } = require('../constants');
const stack = new Uint16Array(STACK_SIZE);

module.exports = (registers) =>
  ({
    push: (val) => {
      if (registers.SP === STACK_SIZE - 1) {
        throw new Error('[Error] Stack overflow. Exiting...');
      }
      stack[registers.SP++] = val;
    },

    pop: () => {
      if (registers.SP === 0) {
        throw new Error('[Error] Stack underflow. Exiting...');
      }
      return stack[--registers.SP];
    },
    raw: stack
  })