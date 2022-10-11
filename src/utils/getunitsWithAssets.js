export const getUnitsWithAssets = (data) => {
  const units = data.map((asset) => asset.unit.name);
  return units.filter((unit, i) => units.indexOf(unit) === i);
};
