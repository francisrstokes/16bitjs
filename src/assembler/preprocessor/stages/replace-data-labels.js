module.exports = (instructions, dataTable) => {
  const dataLabels = Object.keys(dataTable)
    .sort((a, b) => b.length - a.length)

  return instructions
    .map(instruction => {
      return dataLabels
        .reduce((acc, cur) => {
          const labelRegex = new RegExp(cur, 'g');
          return acc.replace(labelRegex, dataTable[cur].address);
        }, instruction);
    });
}