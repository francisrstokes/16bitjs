const fs = require('fs');
const preprocessor = require('../../src/assembler/preprocessor');
const assembler = require('../../src/assembler/assembler');
const { encode, decode } = require('../../src/debugger/snapshot');
const $memory = require('../../src/memory');
const { DEBUG, MEM_SIZE } = require('../../src/constants');
const memory = $memory.memory;
const cpu = require('../../src/cpu')($memory);
const registers = require('../../src/cpu/registers');
const stack = $memory.stack(registers).raw;

const source = fs.readFileSync(__dirname + '/../../asm/xor-swap.asm', 'utf8');

assembler(preprocessor(source)).forEach((v, i) => {
  memory[i] = v;
});

while (!cpu.step()) {
  const res = decode(encode(0));
  assert(res.registers, registers);
  assert(res.stack, stack);
  const pageSize = MEM_SIZE / DEBUG.NUM_PAGES;
  assert(res.memory, memory.slice(0, pageSize));
}

done();
