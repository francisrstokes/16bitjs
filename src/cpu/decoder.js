const arithmetic = require('./alu');
const systemCall = require('../os');
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
  const [opcode, rd, rs, high8, high10] = splitInstruction(instruction);
  const namedOpcode = INSTRUCTION_MAP[opcode];
  switch (namedOpcode) {
    case 'CAL':
      pushStack(stack, registers, registers.IP);
      registers.IP = high10;
      return false;
    case 'RET':
      registers.IP = popStack(stack, registers);
      return false;
    case 'JMP':
      registers.IP = high10;
      return false;
    case 'JMR':
      registers.IP = registers[REGISTERS[rs]];
      return false;

    case 'LDA':
      registers[REGISTERS[rd]] = memory[registers[REGISTERS[rs]]];
      break;

    case 'MOV':
      registers[REGISTERS[rd]] = registers[REGISTERS[rs]];
      return false;
    case 'LDV':
      registers[REGISTERS[rd]] = high10;
      return false;
    case 'LDR':
      registers[REGISTERS[rd]] = memory[high10];
      return false;
    case 'LDM':
      memory[high10] = registers[REGISTERS[rd]];
      return false;
    case 'LDP':
      memory[registers[REGISTERS[rd]]] = registers[REGISTERS[rs]];
      return false;

    case 'ATH':
      arithmetic(registers, rs, rd, high8);
      return false;

    case 'SFT':
      registers[REGISTERS[rs]] = (rd === 0)
        ? registers[REGISTERS[rs]] << high8
        : registers[REGISTERS[rs]] >> high8;
      return false;

    case 'PSH':
      pushStack(stack, registers, registers[REGISTERS[rs]]);
      return false;
    case 'POP':
      registers[REGISTERS[rd]] = popStack(stack, registers);
      return false;

    case 'JLT':
      if (registers.A < registers[REGISTERS[rd]]) {
        registers.IP = high10;
      }
      return false;

    case 'SYS':
      systemCall(instruction, registers);
      return false;

    case 'HLT': return true;

    default:
      console.log(`Unknown opcode ${opcode}. Exiting...`);
      process.exit(1);
      return false;
  }
}