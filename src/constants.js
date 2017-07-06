module.exports = {
  MAX_INT: 0xFFFF,
  MEM_SIZE: 0xFF,
  STACK_SIZE: 0xFF,
  REGISTERS: ['A', 'B', 'C', 'D'],
  INSTRUCTION_MAP: [
    'CAL', 'MOV','LDV','LDR',
    'RET','LDM','MUL','JLT',
    'PSH','ADD','DIV','OUT',
    'POP','SUB','JMP','HLT'
  ],
  EXECUTION_MODES: {
    RUN: 0,
    STEP: 1
  },
  DESTINATION_SHIFT: 4,
  SOURCE_SHIFT: 6,
  ADDRESS_SHIFT: 8
};