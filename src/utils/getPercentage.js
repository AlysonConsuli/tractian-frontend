export const getStatusPercentage = (data, status) => {
  const dataFilter = data.filter((asset) => asset.status === status);
  return +((dataFilter.length / data.length) * 100).toFixed(2);
};

export const getHealthLevelPercentage = (data, unitName) => {
  const assets = data.filter((asset) => asset.unit.name === unitName);
  const total = assets.reduce((total, asset) => total + asset.healthLevel, 0);
  return +(total / assets.length).toFixed(2);
};
