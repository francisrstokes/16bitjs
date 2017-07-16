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


    case 'MOV':
      registers[REGISTERS[rd]] = registers[REGISTERS[rs]];
      return false;

    case 'LDV':
      registers[REGISTERS[rd]] = high10;
      return false;
    case 'LDA':
      registers[REGISTERS[rd]] = memory[registers[REGISTERS[rs]]];
      break;
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

    case 'PSH':
      stack.push(registers[REGISTERS[rs]]);
      return false;
    case 'POP':
      registers[REGISTERS[rd]] = stack.pop();
      return false;


    case 'SYS':
      systemCall(registers);
      return false;

    case 'HLT': return true;

    default:
      console.log(`Unknown opcode ${opcode}. Exiting...`);
      process.exit(1);
      return false;
  }
}