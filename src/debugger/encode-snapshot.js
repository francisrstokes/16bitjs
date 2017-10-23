const toBuffer = require('typedarray-to-buffer');
const { MAX_INT, DEBUG, MEM_SIZE } = require('../constants');
const registers = require('../cpu/registers');
const $memory = require('../memory');

const memory = $memory.memory;
const stack = $memory.stack(registers).raw;

const PAGE_SIZE = MEM_SIZE / DEBUG.NUM_PAGES;

const REGISTER_IDS = Object.keys(registers).sort();

module.exports = (memoryPage) => {
  const regsBuffer = Buffer.allocUnsafe(REGISTER_IDS.length * MAX_INT);
  const offset = memoryPage * PAGE_SIZE;

  for (let i = 0; i < REGISTER_IDS.length; i++) {
    regsBuffer.writeUInt16LE(registers[REGISTER_IDS[i]], MAX_INT * i);
  }

  return Buffer.concat([
    toBuffer(memory.slice(offset, offset + PAGE_SIZE)),
    toBuffer(stack),
    regsBuffer
  ]);
}
