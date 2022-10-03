/* eslint-disable no-param-reassign */

const objectToQueryString = (obj) => {
  const str = [];
  Object.keys(obj).forEach((key) => {
    if (obj(key)) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  });

  return str.join('&');
};

const getKeys = (data) => ((data && typeof data === 'object') ? Object.keys(data) : []);

const queryStrToJSON = () => {
  const pairs = window.location.search.slice(1).split('&');

  const result = {};
  pairs.forEach((pair) => {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
};

const replaceParams = (url, data) => {
  if (!url) { return ''; }
  if (!data) { return url; }

  return url.replace(/[:][a-zA-Z]*/g, (key) => {
    const keyReplace = key.replace(':', '');
    return data[keyReplace] ? data[keyReplace] : `:${keyReplace}`;
  });
};

const getFormValues = (form) => {
  const $form = document.querySelector(form);
  const values = { };

  [...$form.elements].forEach((el) => {
    if (el.name) {
      values[el.name] = el.value;
    }
  });

  return values;
};

export default {
  getKeys,
  queryStrToJSON,
  replaceParams,
  objectToQueryString,
  getFormValues,
};
