const getDirectiveIndexes = (lines) => ({
  data: lines.indexOf('.data'),
  text: lines.indexOf('.text')
});

module.exports = {
  extractDataSection: (lines) => {
    const { data, text } = getDirectiveIndexes(lines);

    return (data < text)
      ? lines.slice(data + 1, text)
      : lines.slice(data + 1, lines.length);
  },
  extractTextSection: (lines) => {
    const { data, text } = getDirectiveIndexes(lines);

    return (text < data)
      ? lines.slice(text + 1, data)
      : lines.slice(text + 1, lines.length);
  },
  getDirectiveIndexes
};
