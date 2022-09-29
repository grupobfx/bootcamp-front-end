import Navigo from "navigo";

import utils from "./utils";
import settings from "./settings";
import menu from "./menu";
import storage from "./storage";

import Inicio from './inicio';

class Upnify {
  constructor() {
    window.addEventListener("load", this.init);
  }

  tkIntegracion = 'P02DD9503AB-F0D9-4C00-AD73-B484D9EB658E';
  tkSesion = null;
  $container = null;

  htmlLoader = () => {
    return `
    <div id="boxLoader">
      <span class="loader">Cargand</span>
    </div>
    `;
  };

  login = async () => {
    const html = await utils.doHttp({ url: settings.recursos.login, json: false });
    this.baseHtml(html);

    const $btnLogin = document.querySelector('#btn-login');
    $btnLogin.onclick = this.doLogin;
  };

  doLogin = async () => {
    const values = utils.getFormValues('#frm-login');
    const { correo, contrasenia } = values;

    if (!correo && !contrasenia) {
      return false
    }

    storage.set('tkSesion', 'P02NjExRDI5MDItNkQxOC00REZGLUJFMTItRTMyNDVBMzUwMEQ0');
    await this.app();
    this.router.navigate('/inicio');
  };

  app = async () => {
    const html = await utils.doHttp({ url: settings.recursos.app, json: false });
    this.baseHtml(html);
    menu.init();
    this.setRoutes();
  }

  baseHtml = (html) => {
    const $container = document.querySelector("#app");
    this.$container = $container;
    $container.innerHTML = html || this.htmlLoader();
  };

  initLoaded = () => {
    // this.$container.innerHTML = 'ok';
  };

  router;
  routes = {
    '/': () => {},
    '/login': this.login,
    '/inicio': Inicio.init,
    '/salir': Inicio.init,
  };

  setRoutes = () => {
    console.log('setRoutes', this.routes);
    this.router = new Navigo('/', { hash: true });
    this.router.on (this.routes);
    this.router.resolve();
  };

  init = async () => {
    this.tkSesion = storage.get('tkSesion');
    this.baseHtml();
    if (this.tkSesion) {
      await this.app();
    } else {
      await this.login();
    }
  };
}

const upnify = new Upnify();
