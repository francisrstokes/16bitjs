const readline = require('readline');
const stdinBuffer = new Uint16Array(1);
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
  stdinBuffer[0] = key.sequence.charCodeAt(0);
});

module.exports = () => stdinBuffer[0];