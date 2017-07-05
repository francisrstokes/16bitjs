module.exports = (file) => 
  file.split('\n')
    .map(line => line.trim())
    .filter(line => line !== '' && line[0] !== '#');