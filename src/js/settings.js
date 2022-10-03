const isLocal = () => {
  const arrLocalHost = ['localhost', '127.0.0.1'];
  return arrLocalHost.includes(document.location.hostname);
};

const getServerResources = () => (isLocal()
  ? 'http://localhost:3300'
  : 'https://assets.upnify.com/scripts');

const recursos = {
  login: `${getServerResources()}/login.html`,
  app: `${getServerResources()}/app.html`,
};

const widgetInfo = (opts) => {
  const { tkIntegracion, tkSesion, config } = opts;
  const info = `\nUpnify Vivienda\n\nlocal: ${isLocal()}\ntkIntegracion: ${
    tkIntegracion
  }\ntkSesion: ${tkSesion}\nconfig: ${JSON.stringify(
    config,
    null,
    2,
  )}\n\n\n`;
  console.info(info);
};

export default {
  local: isLocal(),
  recursos,
  widgetInfo,
};
