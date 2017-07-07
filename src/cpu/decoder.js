const { splitInstruction } = require('../utils');
const {
  INSTRUCTION_MAP,
  REGISTERS,
  STACK_SIZE
} = require('../constants');

const pushStack = (stack, registers, val) => {
  if (registers.SP === STACK_SIZE - 1) {
    console.log('[Error] Stack overflow. Exiting...');
    process.exit(1);
  }
  stack[registers.SP++] = val;
};

const popStack = (stack, registers) => {
  if (registers.SP === 0) {
    console.log('[Error] Stack underflow. Exiting...');
    process.exit(1);
  }
  return stack[--registers.SP];
};

module.exports = (instruction, registers, memory, stack) => {
  const [opcode, rd, rs, rest] = splitInstruction(instruction);
  const namedOpcode = INSTRUCTION_MAP[opcode];
  let result = 0;

  switch (namedOpcode) {
    case 'CAL':
      pushStack(stack, registers, registers.IP);
      registers.IP = rest;
      return false;
    case 'RET':
      registers.IP = popStack(stack, registers);
      return false;

    case 'MOV':
      registers[REGISTERS[rd]] = registers[REGISTERS[rs]];
      return false;
    case 'LDV':
      registers[REGISTERS[rd]] = rest;
      return false;
    case 'LDR':
      registers[REGISTERS[rd]] = memory[rest];
      return false;
    case 'LDM':
      memory[rest] = registers[REGISTERS[rs]];
      return false;

    case 'ADD':
      result = registers[REGISTERS[rd]] + registers[REGISTERS[rs]];
      registers[REGISTERS[rd]] = result;
      return false;
    case 'SUB':
      result = registers[REGISTERS[rs]] - registers[REGISTERS[rd]];
      registers[REGISTERS[rd]] = result;
      return false;
    case 'MUL':
      result = registers[REGISTERS[rs]] * registers[REGISTERS[rd]];
      registers[REGISTERS[rd]] = result;
      return false;
    case 'DIV':
      result = Math.floor(registers[REGISTERS[rs]] / registers[REGISTERS[rd]]);
      registers[REGISTERS[rd]] = result;
      return false;

    case 'PSH':
      pushStack(stack, registers, registers[REGISTERS[rs]]);
      return false;
    case 'POP':
      registers[REGISTERS[rd]] = popStack(stack, registers);
      return false;

    case 'JMP':
      registers.IP = rest;
      return false;
    case 'JLT':
      if (registers[REGISTERS[rs]] < registers[REGISTERS[rd]]) {
        registers.IP = rest;
      }
      return false;

    case 'OUT':
      console.log(registers[REGISTERS[rs]]);
      return false;

    case 'HLT': return true;

    default:
      console.log(`Unknown opcode ${opcode}. Exiting...`);
      process.exit(1);
      return false;
  }
}