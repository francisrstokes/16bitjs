let labelOffset = 0;
const labels = {};

const extractLabels = (line, i) => {
  if (line[0] === ':') {
    labels[line.toLowerCase()] = i - labelOffset++;
    return false;
  } 
  return true;
};

const replaceLabels = (line) => 
  Object.keys(labels)
  .reduce((outLine, label) => outLine.replace(label, labels[label]), line);

module.exports = (file) => 
  file
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '' && line[0] !== '#')
    .filter(extractLabels)
    .map(replaceLabels);