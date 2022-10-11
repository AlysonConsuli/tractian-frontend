export const getPercentage = (data, status) => {
  const dataFilter = data.filter((asset) => asset.status === status);
  return +((dataFilter.length / data.length) * 100).toFixed(2);
};
