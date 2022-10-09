export const setLocalStorage = (key, data) => {
  const dataSerialized = JSON.stringify(data);
  localStorage.setItem(key, dataSerialized);
};

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};
