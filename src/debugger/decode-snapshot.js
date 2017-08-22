const { convertUint8ArrayToUint16Array } = require('../utils');
const { MAX_INT, DEBUG, MEM_SIZE, STACK_SIZE } = require('../constants');
const registers = require('../cpu/registers');

const PAGE_SIZE = MEM_SIZE / DEBUG.NUM_PAGES;

const MEMORY_END_OFFSET = PAGE_SIZE * 2;
const STACK_END_OFFSET = (PAGE_SIZE * 2) + (STACK_SIZE * 2);

const REGISTER_IDS = Object.keys(registers).sort();

module.exports = (buffer) => {
  const snapshot = {
    memory: new Uint8Array(PAGE_SIZE * 2),
    stack: new Uint8Array(STACK_SIZE * 2),
    registers: {}
  };

  buffer.copy(snapshot.memory, 0, 0, MEMORY_END_OFFSET);
  snapshot.memory = convertUint8ArrayToUint16Array(snapshot.memory);

  buffer.copy(snapshot.stack, 0, MEMORY_END_OFFSET, STACK_END_OFFSET);
  snapshot.stack = convertUint8ArrayToUint16Array(snapshot.stack);

  const regsBuffer = new Buffer(buffer.byteLength - STACK_END_OFFSET);
  buffer.copy(regsBuffer, 0, STACK_END_OFFSET, STACK_END_OFFSET + regsBuffer.byteLength);

  for (let i = 0; i < REGISTER_IDS.length; i++) {
    snapshot.registers[REGISTER_IDS[i]] = regsBuffer.readUInt16LE(MAX_INT * i);
  }

  return snapshot;
}
