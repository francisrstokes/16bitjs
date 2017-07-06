const { INSTRUCTION_MAP, REGISTERS, STACK_SIZE } = require('../constants');
const { bin } = require('../utils');

const splitInstruction = (instruction) => [
  (instruction & 0xF),
  (instruction & 0b0000000000110000) >> 4,
  (instruction & 0b0000000011000000) >> 6,
  (instruction & 0b1111111100000000) >> 8
];

const pushStack = (stack, registers, val) => {
  if (registers.SP === STACK_SIZE-1) {
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
  const namedOpcode = INSTRUCTION_MAP[bin(opcode)];
  let result = 0;

  switch (namedOpcode) {
    case 'HLT': return true;

    case 'CAL':
      pushStack(stack, registers, registers.IP);
      registers.IP = rest;
      break;
    case 'RET':
      registers.IP = popStack(stack, registers);
      break;

    case 'MOV':
      registers[REGISTERS[rd]] = registers[REGISTERS[rs]];
      break;
    case 'LDV': 
      registers[REGISTERS[rd]] = rest;
      break;
    case 'LDR': 
      registers[REGISTERS[rd]] = memory[rest];
      break;
    case 'LDM':
      memory[rest] = registers[REGISTERS[rs]];
      break;

    case 'ADD':
      result = registers[REGISTERS[rd]] + registers[REGISTERS[rs]];
      registers[REGISTERS[rd]] = result;
      break;
    case 'SUB':
      result = registers[REGISTERS[rs]] - registers[REGISTERS[rd]];
      registers[REGISTERS[rd]] = result;
      break;
    case 'MUL':
      result = registers[REGISTERS[rs]] * registers[REGISTERS[rd]];
      registers[REGISTERS[rd]] = result;
      break;
    case 'DIV':
      result = Math.floor(registers[REGISTERS[rs]] / registers[REGISTERS[rd]]);
      registers[REGISTERS[rd]] = result;
      break;

    case 'PSH':
      pushStack(stack, registers, registers[REGISTERS[rs]]);
      break;
    case 'POP':
      registers[REGISTERS[rd]] = popStack(stack, registers);
      break;

    case 'JMP':
      registers.IP = rest;
      break;
    case 'JLT':
      if (registers[REGISTERS[rs]] < registers[REGISTERS[rd]]) {
        registers.IP = rest;
      }
      break;

    case 'OUT':
      console.log(registers[REGISTERS[rs]]);
      break;

    default:
      console.log(`Unknown opcode ${opcode}. Exiting...`);
      process.exit(1);
  }
  return false;
}