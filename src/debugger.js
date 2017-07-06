const render = (cpu) => {
  process.stdout.write('\033c');
  cpu.log();
  process.stdout.write('(s)tep (e)xit >>> ');
};

module.exports = (cpu) => {
  process.stdin.setEncoding('utf8');
  render(cpu);
  process.stdin.on('readable', () => {
    const i = process.stdin.read();
    if (i !== null) {
      if ((i[0] === 's' && cpu.step()) || i[0] === 'e') {
        process.exit(0);
      }
      render(cpu);
    }
  });
}