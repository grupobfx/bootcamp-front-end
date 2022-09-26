const get = (key) => {
  const value = localStorage.getItem(key);
  if (!value) { return '' }
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

const set = (key, value) => {
  value = value || '';
  try {
    value = JSON.stringify(value);
  } catch (error) {
    value = value.toString();
  }
  localStorage.setItem(key, value);
};

const del = (key) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};


export default {
  get,
  set,
  del,
  clear,
}
