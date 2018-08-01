const rows = () => {
  if (order === 'bottom') {
    return sortedData
    .reverse()
    .slice(0, LIST_COUNT)
    .map(mapRow);
  }
  return sortedData
  .slice(0, LIST_COUNT)
  .map(mapRow);
};

/* Refactoring */

const getRow = arr => arr.slice(0, LIST_COUNT).map(mapRow);
const rows = order === 'bottom' ? getRow(sortedData.reverse()) : getRow(sortedData);
