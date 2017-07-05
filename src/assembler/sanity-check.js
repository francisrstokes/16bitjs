module.exports = (argv) => {
  // Correct arguments
  if (!argv.i || !argv.o) {
    console.log('Usage: node src/assembler -i {infile} -o {outfile}');
    process.exit(1);
  }

  // Input file exists
  
}