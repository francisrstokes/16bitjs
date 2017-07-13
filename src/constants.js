module.exports = {
  MAX_INT: 0xFFFF,
  MEM_SIZE: 0x0400,
  STACK_SIZE: 0xFF,
  REGISTERS: ['A', 'B', 'C', 'D'],
  INSTRUCTION_MAP: [
    'MOV',
    'LDV',
    'LDR',
    'LDM',
    'ATH',
    'SFT',
    'CAL',
    'JLT',
    'RET',
    'PSH',
    'POP',
    'OUT',
    'HLT'
  ],
  DESTINATION_SHIFT: 4,
  SOURCE_SHIFT: 6,
  LONG_ADDRESS_SHIFT: 6,
  ADDRESS_SHIFT: 8,
  OPERATION_SHIFT: 8,
  ARITHMETIC_MODE_SHIFT: 12,
  BITWISE_SHIFT_SHIFT: 13,

  ARITHMETIC: {
    ADD: 0,
    SUB: 1,
    MUL: 2,
    DIV: 3,
    LSF: 4,
    RSF: 5,
    AND: 6,
    OR: 7,
    XOR: 8,
    NOT: 9,
    DESTINATION_MODE: 0,
    SOURCE_MODE: 1
  },

  DEBUG: { NUM_PAGES: 4 }
};