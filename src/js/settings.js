import utils from "./utils";

const serverApi = "https://api.upnify.com";

const isLocal = () => {
  const arrLocalHost = ["localhost", "127.0.0.1"];
  return arrLocalHost.includes(document.location.hostname);
};

const getServerWidget = () => {
  return isLocal()
    ? "http://localhost:3300"
    : "https://assets.upnify.com/scripts";
};


const recursos = {
  cssInicial: `${getServerWidget()}/css/index.css`,
  login: `${getServerWidget()}/login.html`,
  app: `${getServerWidget()}/app.html`,
};

const api = {
  sesion: '/integraciones/sesion',
  integracionContacto: '/v4/integraciones/:tkIntegracion',
  lineas: '/v4/catalogos/lineas',
  marcas: '/v4/catalogos/marcas',
  modelos: '/v4/catalogos/modelos',
  productos: '/v4/catalogos/productos',
};

const resolveUrl = (opts) => {
  const { url, data } = opts;
  return serverApi + utils.replaceParams(url, data);
};

const widgetInfo = (opts) => {
  const { tkIntegracion, tkSesion, config } = opts;
  const info = `\nUpnify Vivienda\n\nlocal: ${isLocal()}\ntkIntegracion: ${
    tkIntegracion
  }\ntkSesion: ${tkSesion}\nconfig: ${JSON.stringify(
    config,
    null,
    2
  )}\n\n\n`;
  console.info(info);
};

export default {
  local: isLocal(),
  recursos,
  api,
  resolveUrl,
  widgetInfo
};