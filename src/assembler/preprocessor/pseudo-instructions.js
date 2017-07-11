const getInstructionArguments = (instruction) =>
  instruction
    .split(/^[a-zA-Z0-9]+?\s/)[1]
    .split(',')
    .map(x => x.trim());

const pseudoExpanders = {
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
  }
};
const pseudoInstructions = Object.keys(pseudoExpanders);

module.exports = (acc, instruction) => {
  const ins = instruction.split(' ')[0];
  if (pseudoInstructions.indexOf(ins) > -1) {
    const expandedInstructions = pseudoExpanders[ins](instruction);
    acc.push(...expandedInstructions);
  } else {
    acc.push(instruction);
  }
  return acc;
};
