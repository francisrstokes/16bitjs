const {
  INSTRUCTION_MAP,
  REGISTERS,
  DESTINATION_SHIFT,
  SOURCE_SHIFT,
  ADDRESS_SHIFT
} = require('../constants');

const opcodes = INSTRUCTION_MAP
  .reduce((acc, instructionName, opcode) => {
    acc[instructionName] = opcode;
    return acc;
  }, {});

const registerMap = REGISTERS
  .reduce((acc, registerName, bitValue) => {
    acc[registerName] = bitValue;
    return acc;
  }, {});

module.exports = {
  CAL: (args) => opcodes.CAL | (args[0] << ADDRESS_SHIFT),
  RET: (args) => opcodes.RET,
  PSH: (args) => opcodes.PSH | (registerMap[args[0]] << SOURCE_SHIFT),
  POP: (args) => opcodes.POP | (registerMap[args[0]] << DESTINATION_SHIFT),
  JMP: (args) => opcodes.JMP | (args[0] << ADDRESS_SHIFT),
  JLT: (args) => opcodes.JLT | (registerMap[args[0]] << SOURCE_SHIFT) | (registerMap[args[1]] << DESTINATION_SHIFT) | (args[2] << ADDRESS_SHIFT),
  MOV: (args) => opcodes.MOV | (registerMap[args[0]] << DESTINATION_SHIFT) | (registerMap[args[1]] << SOURCE_SHIFT),
  LDV: (args) => opcodes.LDV | (registerMap[args[0]] << DESTINATION_SHIFT) | (args[1] << ADDRESS_SHIFT),
  LDR: (args) => opcodes.LDR | (registerMap[args[0]] << DESTINATION_SHIFT) | (args[1] << ADDRESS_SHIFT),
  LDM: (args) => opcodes.LDM | (registerMap[args[0]] << SOURCE_SHIFT) | (args[1] << ADDRESS_SHIFT),
  ADD: (args) => opcodes.ADD | (registerMap[args[0]] << DESTINATION_SHIFT) | (registerMap[args[1]] << SOURCE_SHIFT),
  SUB: (args) => opcodes.SUB | (registerMap[args[0]] << DESTINATION_SHIFT) | (registerMap[args[1]] << SOURCE_SHIFT),
  MUL: (args) => opcodes.MUL | (registerMap[args[0]] << DESTINATION_SHIFT) | (registerMap[args[1]] << SOURCE_SHIFT),
  DIV: (args) => opcodes.DIV | (registerMap[args[0]] << DESTINATION_SHIFT) | (registerMap[args[1]] << SOURCE_SHIFT),
  OUT: (args) => opcodes.OUT | (registerMap[args[0]] << SOURCE_SHIFT),
  HLT: (args) => opcodes.HLT
};