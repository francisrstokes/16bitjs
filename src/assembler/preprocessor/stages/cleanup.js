const removeWhitespace = line => line.trim();
const removeComments = line => line.split(';')[0];
const removeEmptyLines = line => line !== '';

module.exports = (file) =>
  file
    .split('\n')
    .map(removeWhitespace)
    .map(removeComments)
    .filter(removeEmptyLines)
