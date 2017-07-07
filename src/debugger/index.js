const render = require('./render');

module.exports = (cpu) => {
  process.stdin.setEncoding('utf8');
  render(cpu);

  process.stdin.on('readable', () => {
    const i = process.stdin.read();
    if (i !== null) {
      if ((i[0] === 's' && cpu.step()) || i[0] === 'e' || i[0] === 'q' || i[0] === 'x') {
        process.exit(0);
      }
      render(cpu);
    }
  });
}