export const generateYears = (startYear, endYear, step) => {
  const years = [];
  for (let year = startYear; year <= endYear; year += step) {
    years.push(year);
  }
  return years;
};
