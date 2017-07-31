const expressionsRegex = /\((.+?)\)/g;

module.exports = (instructions) => {
  return instructions.map(instruction => {
    const expressions = instruction.match(expressionsRegex);
    if (expressions) {
      return expressions
        .reduce((acc, expr) => {
          const safeEval = expr.replace(/[^0-9xa-fA-F.|*&^%+\-<>/\s]/g, '');
          const evaluated = eval(safeEval);
          return acc.replace(expr, evaluated);
        }, instruction);
    }
    return instruction;
  })
};