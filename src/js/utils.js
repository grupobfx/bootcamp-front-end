/* eslint-disable no-param-reassign */

function objectToQueryString(obj) {
  const str = [];
  Object.keys(obj).forEach((key) => {
    if (obj(key)) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  });

  return str.join('&');
}

const doHttp = async (opts) => {
  const {
    url, payload, json = true, method = 'GET', headers = {},
  } = opts;
  let queryString = '';
  let options = {};

  if (method !== 'GET') {
    options = {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(payload || {}),
    };
  } else if (payload && method === 'GET') {
    queryString = `?${objectToQueryString(payload)}`;
  }

  Object.keys(headers).forEach((key) => {
    options.headers[key] = headers[key];
  });

  const response = await fetch(url + queryString, options);
  let res;
  if (response.ok) {
    if (json) {
      res = await response.json();
    } else {
      res = await response.text();
    }
  }
  return res;
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
  doHttp,
  getKeys,
  queryStrToJSON,
  replaceParams,
  getFormValues,
};
