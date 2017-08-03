module.exports = {
  MAX_INT: 0xFFFF,
  MEM_SIZE: 0xFFFF,
  STACK_SIZE: 0xFF,
  REGISTERS: ['A', 'B', 'C', 'D'],
  INSTRUCTION_MAP: [
    'MVR',
    'MVV',
    'LDR',
    'STA',
    'ATH',
    'CAL',
    'JCP',
    'RET',
    'PSH',
    'POP',
    'SYS',
    'HLT',
    'JMP',
    'JMR',
    'LDA',
    'STR'
  ],
  DESTINATION_SHIFT: 4,
  SOURCE_SHIFT: 6,
  LONG_ADDRESS_SHIFT: 6,
  ADDRESS_SHIFT: 8,
  OFFSET_SHIFT: 8,
  OPERATION_SHIFT: 8,
  ARITHMETIC_MODE_SHIFT: 12,
  BITWISE_SHIFT_SHIFT: 13,

  JUMP: {
    EQ: 0,
    NEQ: 1,
    LT: 2,
    GT: 3,
    LTE: 4,
    GTE: 5,
    ZER: 6,
    NZE: 7,

    R1: 4,
    R2: 6,
    AR: 8,
    OP: 10
  },

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
    STDIN: 1
  },

  DIRECT_ASSIGNMENT: 0,
  BUFFER_ASSIGNMENT: 1,
  STRING_ASSIGNMENT: 2,

  DEBUG: { NUM_PAGES: 255 }
};