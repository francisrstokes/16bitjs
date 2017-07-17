let labelOffset = 0;
const labels = {};

const extractLabels = (line, i) => {
  const firstPart = line.split(' ')[0];
  if (firstPart[firstPart.length - 1] === ':') {
    labels[line.toLowerCase()] = i - labelOffset++;
    return false;
  }
  return true;
};

const replaceLabels = (line) => Object.keys(labels)
  .sort((a, b) => b.length - a.length)
  .reduce((outLine, label) => outLine.replace(label, labels[label]), line)

module.exports = (instructions) =>
  instructions
    .filter(extractLabels)
    .map(replaceLabels);
