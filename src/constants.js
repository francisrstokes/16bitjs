module.exports = {
  MAX_INT: 0xFFFF,
  MEM_SIZE: 0xFF,
  VALID_INSTRUCTIONS: [
    'NOP','MOV','LDV','LDR',
    'LDA','LDM','ADD','SUB',
    'MUL','DIV','JMP','JLT',
    'OUT','HLT'
  ],
  REGISTERS: ['A', 'B', 'C', 'D'],
  INSTRUCTION_MAP: {
    '0': 'NOP',
    '1': 'MOV',
    '10': 'LDV',
    '11': 'LDR',
    '100': 'LDA',
    '101': 'LDM',
    '1001': 'ADD',
    '1101': 'SUB',
    '110': 'MUL',
    '1010': 'DIV',
    '1110': 'JMP',
    '111': 'JLT',
    '1011': 'OUT',
    '1111': 'HLT'  
  }
};