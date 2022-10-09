export const setLocalStorage = (key, data) => {
  const dataSerialized = JSON.stringify(data);
  localStorage.setItem(key, dataSerialized);
};
