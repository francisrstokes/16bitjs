const expressionsRegex = /\((.+?)\)/g;

module.exports = (instructions) => {
  return instructions.map(instruction => {
    const expressions = instruction.match(expressionsRegex);
    if (expressions) {
      return expressions
        .reduce((acc, expr) => {
          const evaluated = eval(expr);
          return acc.replace(expr, evaluated);
        }, instruction);
    }
    return instruction;
  })
};