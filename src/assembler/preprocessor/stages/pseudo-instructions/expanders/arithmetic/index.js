const ADD = require('./ADD');
const ADDS = require('./ADDS');
const SUB = require('./SUB');
const SUBS = require('./SUBS');
const MUL = require('./MUL');
const MULS = require('./MULS');
const DIV = require('./DIV');
const DIVS = require('./DIVS');
const INC = require('./INC');
const DEC = require('./DEC');
const MOV = require('./MOV');
const LDV = require('./LDV');
const MVI = require('./MVI');
const ADI = require('./ADI');
const MUI = require('./MUI');
const AUI = require('./AUI');

module.exports = {
  ADD,
  ADDS,
  SUB,
  SUBS,
  MUL,
  MULS,
  DIV,
  DIVS,
  INC,
  DEC,
  MOV,
  LDV, // asm retro-compatibility, same as MVI
  MVI,
  ADI,
  MUI,
  AUI
};
