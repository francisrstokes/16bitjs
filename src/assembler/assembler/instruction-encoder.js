const {
  INSTRUCTION_MAP,
  REGISTERS,

  DESTINATION_SHIFT,
  SOURCE_SHIFT,
  LONG_ADDRESS_SHIFT,
  OFFSET_SHIFT,

  JUMP,

  ARITHMETIC_MODE_SHIFT,
  OPERATION_SHIFT,
  BITWISE_SHIFT_SHIFT
} = require('../../constants');

const opcodes = INSTRUCTION_MAP
  .reduce((acc, instructionName, opcode) => {
    acc[instructionName] = opcode;
    return acc;
  }, {});

const reg = REGISTERS
  .reduce((acc, registerName, bitValue) => {
    acc[registerName] = bitValue;
    return acc;
  }, {});

module.exports = {
  MVR: (args) => opcodes.MVR | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT) | (args[2] << OFFSET_SHIFT),
  MVV: (args) => opcodes.MVV | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << OFFSET_SHIFT) | (args[2] << SOURCE_SHIFT),
  LDR: (args) => opcodes.LDR | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT) | (args.length > 2 ? (args[2] << OFFSET_SHIFT) : 0),
  STA: (args) => opcodes.STA | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  LDA: (args) => opcodes.LDA | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  STR: (args) => opcodes.STR | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT) | (args.length > 2 ? (args[2] << OFFSET_SHIFT) : 0),
  ATH: (args) => opcodes.ATH | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT) | (args[2] << OPERATION_SHIFT) | (args[3] << ARITHMETIC_MODE_SHIFT) | (args[4] << BITWISE_SHIFT_SHIFT),
  CAL: (args) => opcodes.CAL | (reg[args[0]] << DESTINATION_SHIFT),
  JCP: (args) => opcodes.JCP | (reg[args[0]] << JUMP.R1) | (reg[args[1]] << JUMP.R2) | (reg[args[2]] << JUMP.AR) | (args[3] << JUMP.OP),
  PSH: (args) => opcodes.PSH | (reg[args[0]] << SOURCE_SHIFT),
  POP: (args) => opcodes.POP | (reg[args[0]] << DESTINATION_SHIFT),
  JMP: (args) => opcodes.JMP | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  JMR: (args) => opcodes.JMR | (reg[args[0]] << DESTINATION_SHIFT),
  NOA: (args) => opcodes.NOA | (args[0] << DESTINATION_SHIFT)
};
