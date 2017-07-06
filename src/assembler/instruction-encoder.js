const RD = 4;
const RS = 6;
const MEM = 8;

const CAL = 0b0000;
const RET = 0b0100;
const MOV = 0b0001;
const LDV = 0b0010;
const LDR = 0b0011;
const LDM = 0b0101;
const PSH = 0b1000;
const POP = 0b1100;
const ADD = 0b1001;
const SUB = 0b1101;
const MUL = 0b0110;
const DIV = 0b1010;
const JMP = 0b1110;
const JLT = 0b0111;
const OUT = 0b1011;
const HLT = 0b1111;

const registerMap = {
  A: 0b00,
  B: 0b01,
  C: 0b10,
  D: 0b11
};

module.exports = {
  CAL: (args) => CAL | (args[0] << MEM),
  RET: (args) => RET,
  PSH: (args) => PSH | (registerMap[args[0]] << RS),
  POP: (args) => POP | (registerMap[args[0]] << RD),
  JMP: (args) => JMP | (args[0] << MEM),
  JLT: (args) => JLT | (registerMap[args[0]] << RS) | (registerMap[args[1]] << RD) | (args[2] << MEM),
  MOV: (args) => MOV | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  LDV: (args) => LDV | (registerMap[args[0]] << RD) | (args[1] << MEM),
  LDR: (args) => LDR | (registerMap[args[0]] << RD) | (args[1] << MEM),
  LDM: (args) => LDM | (registerMap[args[0]] << RS) | (args[1] << MEM),
  ADD: (args) => ADD | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  SUB: (args) => SUB | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  MUL: (args) => MUL | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  DIV: (args) => DIV | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  OUT: (args) => OUT | (registerMap[args[0]] << RS),
  HLT: (args) => HLT
};