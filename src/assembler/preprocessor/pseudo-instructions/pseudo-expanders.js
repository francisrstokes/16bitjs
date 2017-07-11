const getInstructionArguments = (instruction) =>
  instruction
    .split(/^[a-zA-Z0-9]+?\s/)[1]
    .split(',')
    .map(x => x.trim());

const uniqueLabel = () =>
  ':' + Math
    .random()
    .toString(16)
    .slice(2);

module.exports = {
  LDV16: (instruction) => {
    const [register, value] = getInstructionArguments(instruction);
    return [
      `LDV ${register}, (${value} >> 8)`,
      'SFT A, 0, 8',
      'PSH B',
      `LDV B, (${value} & 0b0000000011111111)`,
      'ADD A, B',
      'POP B'
    ];
  },
  SWP: (instruction) => {
    const [source, destination] = getInstructionArguments(instruction);
    return [
      `PSH ${source}`,
      `MOV ${source}, ${destination}`,
      `POP ${destination}`
    ];
  },
  SUBS: (instruction) => {
    const [source, destination] = getInstructionArguments(instruction);
    return [
      `PSH ${source}`,
      `SUB ${source}, ${destination}`,
      `MOV ${destination}, ${source}`,
      `POP ${source}`
    ];
  },
  DIVS: (instruction) => {
    const [source, destination] = getInstructionArguments(instruction);
    return [
      `PSH ${source}`,
      `DIV ${source}, ${destination}`,
      `MOV ${destination}, ${source}`,
      `POP ${source}`
    ];
  },
  JGE: (instruction) => {
    const [source, address] = getInstructionArguments(instruction);
    const label = uniqueLabel();
    return [
      `JLT ${source}, ${label}`,
      `LDV ${source}, ${address}`,
      `PSH ${source}`,
      'RET',
      `${label}`
    ];
  }
};