module.exports = (instructions) => {
  const labels = {};
  let labelOffset = 0;

  return instructions
    .filter((line, i) => {
      const firstPart = line.split(' ')[0];
      if (firstPart[firstPart.length - 1] === ':') {
        labels[line.toLowerCase()] = i - labelOffset++;
        return false;
      }
      return true;
    })
    .map(line =>
      Object.keys(labels)
        .sort((a, b) => b.length - a.length)
        .reduce((outLine, label) =>
          outLine.replace(label, labels[label]),
        line)
    );
}
