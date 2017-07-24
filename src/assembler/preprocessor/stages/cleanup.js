const commentRegex = /(?!\\).;/g;

const removeWhitespace = line => line.trim();
const removeEmptyLines = line => line !== '';
const removeComments = (line) => {
  if (line[0] === ';') return '';
  const commentMatches = line.match(commentRegex);
  if (commentMatches && commentMatches.length > 0) {
    const commentIndex = commentMatches[0][0] === ';'
      ? line.indexOf(commentMatches[0])
      : line.indexOf(commentMatches[0]) + 1;

    return line.substring(0, commentIndex).trim();
  }
  return line;
};

module.exports = (file) =>
  file
    .split('\n')
    .map(removeWhitespace)
    .map(removeComments)
    .filter(removeEmptyLines);
