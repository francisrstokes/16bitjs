const pseudoExpanders = require('./expanders');
const pseudoInstructions = Object.keys(pseudoExpanders);

const expandInstructions = (acc, instruction) => {
  const ins = instruction.split(' ')[0];
  if (pseudoInstructions.indexOf(ins) > -1) {
    const expandedInstructions = pseudoExpanders[ins](instruction);
    acc.push(...expandedInstructions);
  } else {
    acc.push(instruction);
  }
  return acc;
};

module.exports = (instructions) => {
  let programSize = instructions.length;
  let expandedProgram = [];
  let done = false;

  while (!done) {
    expandedProgram = instructions.reduce(expandInstructions, []);
    const newSize = expandedProgram.length;
    done = newSize === programSize;
    programSize = newSize;
  }

  return expandedProgram;
};
