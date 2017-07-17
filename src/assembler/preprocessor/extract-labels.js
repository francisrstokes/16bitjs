let labelOffset = 0;
const labels = {};

module.exports = {
  extractLabels: (line, i) => {
    const firstPart = line.split(' ')[0];
    if (firstPart[firstPart.length - 1] === ':') {
      labels[line.toLowerCase()] = i - labelOffset++;
      return false;
    }
    return true;
  },
  replaceLabels: (line) => Object.keys(labels)
    .sort((a, b) => b.length - a.length)
    .reduce((outLine, label) => outLine.replace(label, labels[label]), line)
}