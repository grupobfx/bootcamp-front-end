const animateCSS = (element, animation, prefix = "ctcUp_animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

const doHttp = (opts) => {
  const { url, paylaod = {}, json = true, method = 'GET', headers = {} } = opts;
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();

    const queryString = method === 'GET' ? '?'+objectToQueryString(paylaod) : ''; 

    req.open(method, url+queryString, true);

    Object.keys(headers).forEach((key) => {
      req.setRequestHeader(key, headers[key]);
    });

    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          const res = json
            ? JSON.parse(req.responseText)
            : req.responseText;
          resolve(res); 
        } else {
          reject(req);
        }
      }
    };
    req.onerror = function () {
      reject(Error("network error"));
    };
    req.send(paylaod);
  });
};

const getKeys = (data) => (data && typeof data === 'object') ? Object.keys(data) : [];

const queryStrToJSON = () => {
  var pairs = location.search.slice(1).split("&");

  var result = {};
  pairs.forEach(function (pair) {
    pair = pair.split("=");
    result[pair[0]] = decodeURIComponent(pair[1] || "");
  });

  return JSON.parse(JSON.stringify(result));
};

function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

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
      values[el.name] = el.value
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
 