let labelOffset = 0;
const labels = {};

module.exports = {
  extractLabels: (line, i) => {
    if (line[0] === ':') {
      labels[line.toLowerCase()] = i - labelOffset++;
      return false;
    }
    return true;
  },
  replaceLabels: (line) => Object.keys(labels)
    .sort((a, b) => b.length - a.length)
    .reduce((outLine, label) => outLine.replace(label, labels[label]), line)
}