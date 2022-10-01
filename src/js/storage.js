const get = (key) => {
  const value = localStorage.getItem(key);
  if (!value) { return ''; }
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

const set = (key, value) => {
  let v = value || '';
  try {
    v = JSON.stringify(v);
  } catch (error) {
    v = v.toString();
  }
  localStorage.setItem(key, v);
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
};
