module.exports = (lines) => {
  const checkForDirective = (directive) => {
    if (lines.indexOf(directive) < 0) {
      console.log(`No ${directive} directive found. Exiting...`);
      process.exit(1);
    }
  };
  ['.data', '.text'].forEach(checkForDirective);

  const foundGlobal = lines.some(line => {
    const directive = line.split(' ')[0];
    return directive === '.global';
  });

  if (!foundGlobal) {
    console.log('No .global directive found. Exiting...');
    process.exit(1);
  }
}