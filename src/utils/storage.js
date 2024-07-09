const Storage = function () {
  const getItem = (key) => {
    const data = localStorage.getItem(key);
    if (data != null) {
      return JSON.parse(data);
    }
    return null;
  };
  const setItem = (key, value, formatData = true) => {
    return localStorage.setItem(
      key,
      formatData ? JSON.stringify(value) : value,
    );
  };
  const removeItem = (key) => {
    return localStorage.removeItem(key);
  };
  const clearAllItem = () => {
    localStorage.clear();
  };
  return Object.freeze({
    getItem,
    setItem,
    removeItem,
    clearAllItem,
  });
};
export default Storage();
