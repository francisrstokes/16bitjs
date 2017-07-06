module.exports = {
  MAX_INT: 0xFFFF,
  MEM_SIZE: 0xFF,
  STACK_SIZE: 0xFF,
  VALID_INSTRUCTIONS: [
    'CAL','MOV','LDV','LDR',
    'RET','LDM','ADD','SUB',
    'MUL','DIV','JMP','JLT',
    'OUT','HLT','PSH','POP'
  ],
  REGISTERS: ['A', 'B', 'C', 'D'],
  INSTRUCTION_MAP: {
    '0': 'CAL',
    '1': 'MOV',
    '10': 'LDV',
    '11': 'LDR',
    '100': 'RET',
    '101': 'LDM',
    '1001': 'ADD',
    '1101': 'SUB',
    '110': 'MUL',
    '1010': 'DIV',
    '1110': 'JMP',
    '111': 'JLT',
    '1011': 'OUT',
    '1111': 'HLT',
    '1000': 'PSH',
    '1100': 'POP'
  },
  EXECUTION_MODES: {
    RUN: 0,
    STEP: 1
  }
};