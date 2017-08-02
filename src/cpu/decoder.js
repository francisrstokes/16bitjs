const arithmetic = require('./alu');
const systemCall = require('../os');
const { splitInstruction } = require('../utils');
const {
  INSTRUCTION_MAP,
  REGISTERS
} = require('../constants');

module.exports = (instruction, registers, memory, stack) => {
  const [opcode, rd, rs, high8, high10] = splitInstruction(instruction);
  const namedOpcode = INSTRUCTION_MAP[opcode];
  switch (namedOpcode) {
    case 'CAL':
      stack.push(registers.IP);
      registers.IP = registers[REGISTERS[rd]];
      return false;
    case 'RET':
      registers.IP = stack.pop();
      return false;

    case 'JLT':
      if (registers.A < registers[REGISTERS[rd]]) {
        registers.IP = registers[REGISTERS[rs]];
      }
      return false;
    case 'JMP':
      registers.IP = high10;
      return false;
    case 'JMR':
      registers.IP = registers[REGISTERS[rd]];
      return false;


    case 'MVR':
      registers[REGISTERS[rd]] = ((registers[REGISTERS[rs]] << 16) >> 16) + ((high8 << 24) >> 24);
      return false;

    case 'MVV':
      switch (high10 & 3) { 
        case 0: // MVI
          registers[REGISTERS[rd]] = high8;
          return false;
        case 1: // ADI
          registers[REGISTERS[rd]] = ((registers[REGISTERS[rd]] << 16) >> 16) + ((high8 << 24) >> 24);
          return false;
        case 2: // MUI
          registers[REGISTERS[rd]] = high8 << 8;
          return false;
        case 3: // AUI
          registers[REGISTERS[rd]] = registers[REGISTERS[rd]] + (high8 << 8);
          return false;
        default:
          break;
      }
      break;
    case 'LDR':
      registers[REGISTERS[rd]] = memory[((registers[REGISTERS[rs]] << 16) + ((high8 << 24) >> 8)) >>> 16];
      break;
    case 'LDA':
      registers[REGISTERS[rd]] = memory[high10];
      return false;
    case 'STA':
      memory[high10] = registers[REGISTERS[rd]];
      return false;
    case 'LDP':
      memory[registers[REGISTERS[rd]]] = registers[REGISTERS[rs]];
      return false;

    case 'ATH':
      arithmetic(registers, rs, rd, high8);
      return false;

    case 'PSH':
      stack.push(registers[REGISTERS[rs]]);
      return false;
    case 'POP':
      registers[REGISTERS[rd]] = stack.pop();
      return false;


    case 'SYS':
      systemCall(registers, memory);
      return false;

    case 'HLT': return true;

    default:
      throw new Error(`Unknown opcode ${opcode}. Exiting...`);
  }
}