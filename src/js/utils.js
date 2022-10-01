const animateCSS = (element, animation, prefix = 'ctcUp_animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

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
  const pairs = location.search.slice(1).split('&');

  const result = {};
  pairs.forEach((pair) => {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
};

function objectToQueryString(obj) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
}

const replaceParams = (url, data) => {
  if (!url) { return ''; }
  if (!data) { return url; }

  return url.replace(/[:][a-zA-Z]*/g, (key) => {
    key = key.replace(':', '');
    return data[key] ? data[key] : `:${key}`;
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
  animateCSS,
  doHttp,
  getKeys,
  queryStrToJSON,
  replaceParams,
  getFormValues,
};
