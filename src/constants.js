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
    'CAL',
    'JLT',
    'RET',
    'PSH',
    'POP',
    'SYS',
    'HLT',
    'JMP',
    'JMR',
    'LDA',
    'NOP'
  ],
  DESTINATION_SHIFT: 4,
  SYSTEM_CALL_SHIFT: 4,
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
    INC: 4,
    DEC: 5,

    LSF: 6,
    RSF: 7,
    AND: 8,
    OR: 9,
    XOR: 10,
    NOT: 11,

    DESTINATION_MODE: 0,
    SOURCE_MODE: 1
  },

  OS: {
    STDOUT: 0,
    STDIN: 1,

    REGISTER_SHIFT: 8,
    MODE_SHIFT: 10
  },

  DEBUG: { NUM_PAGES: 4 }
};