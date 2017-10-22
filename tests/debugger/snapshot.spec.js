const { assert } = require('chai');
const fs = require('fs');
const preprocessor = require('../../src/assembler/preprocessor');
const assembler = require('../../src/assembler/assembler');
const { encode, decode } = require('../../src/debugger/snapshot');
const pagedMemory = require('../../src/debugger/memory-pages');
const { arrayAsHex, leftPad } = require('../../src/utils');
const $memory = require('../../src/memory');
const { DEBUG, MEM_SIZE, STACK_SIZE } = require('../../src/constants');
const memory = $memory.memory;
const cpu = require('../../src/cpu')($memory);
const registers = require('../../src/cpu/registers');

const stack = $memory.stack(registers).raw;

describe('debugger', () => {
  it('encode/decode', () => {
    assembler(preprocessor(fs.readFileSync(__dirname + '/../../asm/factorial.asm', 'utf8')))
      .forEach((v, i) => {
        memory[i] = v;
      });

    while (!cpu.step()) {
      const res = decode(encode(0));
      assert.deepEqual(res.registers, registers);
      assert.deepEqual(res.stack, stack);
      const pageSize = MEM_SIZE / DEBUG.NUM_PAGES;
      assert.deepEqual(res.memory, memory.slice(0, pageSize));
    }

    memory.fill(0, 0, MEM_SIZE)
    stack.fill(0, 0, STACK_SIZE)

    Object.keys(registers).forEach(key => {
      registers[key] = 0
    });

    assembler(preprocessor(fs.readFileSync(__dirname + '/../../asm/xor-swap.asm', 'utf8')))
      .forEach((v, i) => {
        memory[i] = v;
      });

    while (!cpu.step()) {
      const res = decode(encode(0));
      assert.deepEqual(res.registers, registers);
      assert.deepEqual(res.stack, stack);
      const pageSize = MEM_SIZE / DEBUG.NUM_PAGES;
      assert.deepEqual(res.memory, memory.slice(0, pageSize));
    }
  });
})
