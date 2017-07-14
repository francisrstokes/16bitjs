const { STACK_SIZE } = require('../constants');
const stack = new Uint16Array(STACK_SIZE);

module.exports = (registers) =>
  ({
    push: (val) => {
      if (registers.SP === STACK_SIZE - 1) {
        console.log('[Error] Stack overflow. Exiting...');
        process.exit(1);
      }
      stack[registers.SP++] = val;
    },

    pop: () => {
      if (registers.SP === 0) {
        console.log('[Error] Stack underflow. Exiting...');
        process.exit(1);
      }
      return stack[--registers.SP];
    },
    raw: stack
  })