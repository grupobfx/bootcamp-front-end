import utils from './utils';

const getServer = (url) => {
  const api = 'http://34.223.223.139:3000/';
  if (url.includes('http')) { return url; }

  return api + url;
};

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
    queryString = `?${utils.objectToQueryString(payload)}`;
  }

  Object.keys(headers).forEach((key) => {
    options.headers[key] = headers[key];
  });

  const response = await fetch(getServer(url) + queryString, options);
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

const resolveUrl = (opts) => {
  const { url, data } = opts;
  return utils.replaceParams(url, data);
};

export default {
  doHttp,
  resolveUrl,
};
