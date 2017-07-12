module.exports = {
  MAX_INT: 0xFFFF,
  MEM_SIZE: 0x0400,
  STACK_SIZE: 0xFF,
  REGISTERS: ['A', 'B', 'C', 'D'],
  INSTRUCTION_MAP: [
    'CAL', 'MOV', 'LDV', 'LDR',
    'RET', 'LDM', 'ATH', 'JLT',
    'PSH', 'OUT', 'POP', 'SFT',
    'HLT'
  ],
  DESTINATION_SHIFT: 4,
  SOURCE_SHIFT: 6,
  LONG_ADDRESS_SHIFT: 6,
  OPERATION_SHIFT: 6,
  ADDRESS_SHIFT: 8,
  ARITHMETIC_MODE_SHIFT: 10,

  ARITHMETIC: {
    ADD: 0,
    SUB: 1,
    MUL: 3,
    DIV: 4,
    DESTINATION_MODE: 0,
    SOURCE_MODE: 1
  },

  DEBUG: { NUM_PAGES: 4 }
};