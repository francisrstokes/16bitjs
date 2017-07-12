const { DEBUG } = require('../constants');
const render = require('./render');

module.exports = (cpu) => {
  let memoryPage = 0;
  process.stdin.setEncoding('utf8');
  render(memoryPage);

  process.stdin.on('readable', () => {
    const i = process.stdin.read();
    if (i !== null) {
      if ((i[0] === 's' && cpu.step()) || i[0] === 'e' || i[0] === 'q' || i[0] === 'x') {
        process.exit(0);
      } else if (i[0] === 'n' && memoryPage < DEBUG.NUM_PAGES - 1) {
        memoryPage++;
      } else if (i[0] === 'p' && memoryPage > 0) {
        memoryPage--;
      }
      render(memoryPage);
    }
  });
}