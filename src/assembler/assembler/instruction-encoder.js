const {
  INSTRUCTION_MAP,
  REGISTERS,
  DESTINATION_SHIFT,
  SOURCE_SHIFT,
  ADDRESS_SHIFT,
  LONG_ADDRESS_SHIFT
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
  CAL: (args) => opcodes.CAL | (args[0] << LONG_ADDRESS_SHIFT),
  RET: () => opcodes.RET,
  PSH: (args) => opcodes.PSH | (reg[args[0]] << SOURCE_SHIFT),
  POP: (args) => opcodes.POP | (reg[args[0]] << DESTINATION_SHIFT),
  SFT: (args) => opcodes.SFT | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT) | (args[0] << ADDRESS_SHIFT),
  JLT: (args) => opcodes.JLT | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  MOV: (args) => opcodes.MOV | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT),
  LDV: (args) => opcodes.LDV | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  LDR: (args) => opcodes.LDR | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  LDM: (args) => opcodes.LDM | (reg[args[0]] << SOURCE_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  ADD: (args) => opcodes.ADD | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT),
  SUB: (args) => opcodes.SUB | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT),
  MUL: (args) => opcodes.MUL | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT),
  DIV: (args) => opcodes.DIV | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT),
  OUT: (args) => opcodes.OUT | (reg[args[0]] << SOURCE_SHIFT),
  HLT: () => opcodes.HLT
};