module.exports = (lines) => {
  const checkForDirective = (directive) => {
    if (lines.indexOf(directive) < 0) {
      throw new Error(`No ${directive} directive found. Exiting...`);
    }
  };
  ['.data', '.text'].forEach(checkForDirective);

  const foundGlobal = lines.some(line => {
    const directive = line.split(' ')[0];
    return directive === '.global';
  });

  if (!foundGlobal) {
    throw new Error('No .global directive found. Exiting...');
  }
}