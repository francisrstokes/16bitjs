const { assert } = require('chai');
const fs = require('fs');
const preprocessor = require('../src/assembler/preprocessor');
const assembler = require('../src/assembler/assembler');
const createServer = require('../src/debugger/server');
const createClient = require('../src/debugger/client');
const { encode, decode } = require('../src/debugger/snapshot');
const pagedMemory = require('../src/debugger/memory-pages');
const { arrayAsHex, leftPad } = require('../src/utils');
const $memory = require('../src/memory');
const { DEBUG, MEM_SIZE, STACK_SIZE } = require('../src/constants');
const memory = $memory.memory;
const cpu = require('../src/cpu')($memory);
const registers = require('../src/cpu/registers');
const stack = $memory.stack(registers).raw;

describe('debugger', () => {
  beforeEach(() => reset())

  it('encode/decode', () => {
    loadFile(`${__dirname}/../asm/factorial.asm`)

    while (!cpu.step()) {
      const res = decode(encode(0));
      assert.deepEqual(res.registers, registers);
      assert.deepEqual(res.stack, stack);
      const pageSize = MEM_SIZE / DEBUG.NUM_PAGES;
      assert.deepEqual(res.memory, memory.slice(0, pageSize));
    }
  });

  it('encode/decode 2', () => {
    loadFile(`${__dirname}/../asm/xor-swap.asm`);

    while (!cpu.step()) {
      const res = decode(encode(0));
      assert.deepEqual(res.registers, registers);
      assert.deepEqual(res.stack, stack);
      const pageSize = MEM_SIZE / DEBUG.NUM_PAGES;
      assert.deepEqual(res.memory, memory.slice(0, pageSize));
    }
  })

  it('wsock', async () => {
    loadFile(`${__dirname}/../asm/xor-swap.asm`);

    const server = await createServer(cpu);
    const client = createClient(server);

    let res;

    while (res = (await client.step())) {
      assert.deepEqual(res.registers, registers);
      assert.deepEqual(res.stack, stack);
      const pageSize = MEM_SIZE / DEBUG.NUM_PAGES;
      assert.deepEqual(res.memory, memory.slice(0, pageSize));
    }

    await client.close()
    await server.close()
  }).timeout(20000)

  it('wsock reset', async () => {
    loadFile(`${__dirname}/../asm/xor-swap.asm`);

    const server = await createServer(cpu);
    const client = createClient(server);

    let res;

    while (res = (await client.step())) {
      assert.deepEqual(res.registers, registers);
      assert.deepEqual(res.stack, stack);
      const pageSize = MEM_SIZE / DEBUG.NUM_PAGES;
      assert.deepEqual(res.memory, memory.slice(0, pageSize));
    }

    client.reset();

    loadFile(`${__dirname}/../asm/xor-swap.asm`);

    while (res = (await client.step())) {
      assert.deepEqual(res.registers, registers);
      assert.deepEqual(res.stack, stack);
      const pageSize = MEM_SIZE / DEBUG.NUM_PAGES;
      assert.deepEqual(res.memory, memory.slice(0, pageSize));
    }

    await client.close()
    await server.close()
  }).timeout(20000)
})

function loadFile(file) {
  assembler(preprocessor(fs.readFileSync(file, 'utf8')))
    .forEach((v, i) => {
      memory[i] = v;
    });
}

function reset() {
  memory.fill(0, 0, MEM_SIZE);
  stack.fill(0, 0, STACK_SIZE);
  Object.keys(registers).forEach(key => {
    registers[key] = 0;
  });
}
