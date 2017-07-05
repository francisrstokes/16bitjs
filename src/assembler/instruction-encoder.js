const RD = 4;
const RS = 6;
const MEM = 8;

const NOP = 0b0000; // No operation
const MOV = 0b0001; // Move value at source register to destination register
const LDV = 0b0010; // Load a value into destination register
const LDR = 0b0011; // Load a value from memory into destination register
const LDA = 0b0100; // Load the value in memory specified by source register into destination register
const LDM = 0b0101; // Load the value in source register into memory
const ADD = 0b1001; // Add x and y and store the value in x
const SUB = 0b1101; // Subtract x from y  and store the value in x
const MUL = 0b0110; // Multiply x and y and store the value in x
const DIV = 0b1010; // Divide x by y and store the value in x
const JMP = 0b1110; // Jump to memory address
const JLT = 0b0111; // Jump to memory address if value in source register is less than value in destination register
const OUT = 0b1011; // Output the value in source register
const HLT = 0b1111; // Program halt

const registerMap = {
  A: 0b00,
  B: 0b01,
  C: 0b10,
  D: 0b11
};

module.exports = {
  NOP: ()     => NOP,
  MOV: (args) => MOV | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  LDV: (args) => LDV | (registerMap[args[0]] << RD) | (args[1] << MEM),
  LDR: (args) => LDR | (registerMap[args[0]] << RD) | (args[1] << MEM),
  LDA: (args) => LDA | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  LDM: (args) => LDM | (registerMap[args[0]] << RS) | (args[1] << MEM),
  ADD: (args) => ADD | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  SUB: (args) => SUB | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  MUL: (args) => MUL | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  DIV: (args) => DIV | (registerMap[args[0]] << RD) | (registerMap[args[1]] << RS),
  JMP: (args) => JMP | (args[0] << MEM),
  JLT: (args) => JLT | (registerMap[args[0]] << RS) | (registerMap[args[1]] << RD) | (args[2] << MEM),
  OUT: (args) => OUT | (registerMap[args[0]] << RS),
  HLT: ()     => HLT
};