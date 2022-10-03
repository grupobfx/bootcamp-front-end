import Navigo from 'navigo';

import utils from './utils';
import settings from './settings';
import menu from './menu';
import storage from './storage';
import ui from './ui';
import http from './http';

import Inicio from './inicio';

class Upnify {
  constructor() {
    window.addEventListener('load', this.init);
  }

  tkSesion = null;

  $container = null;

  login = async () => {
    const html = await http.doHttp({ url: settings.recursos.login, json: false });
    this.baseHtml(html);

    const $btnLogin = document.querySelector('#btn-login');
    $btnLogin.onclick = this.doLogin;
  };

  doLogin = async () => {
    const values = utils.getFormValues('#frm-login');
    const { correo, contrasenia } = values;

    if (!correo && !contrasenia) {
      return false;
    }

    // storage.set('tkSesion', 'P02NjExRDI5MDItNkQxOC00REZGLUJFMTItRTMyNDVBMzUwMEQ0');
    await this.app();
    return true;
  };

  app = async () => {
    const html = await http.doHttp({ url: settings.recursos.app, json: false });
    this.baseHtml(html);
    menu.init();
    this.setRoutes();
  };

  baseHtml = (html) => {
    const $container = document.querySelector('#app');
    this.$container = $container;
    $container.innerHTML = html || ui.loader();
  };

  logout = async () => {
    storage.clear();
    this.router.navigate('/');
    await this.login();
  };

  router;

  // inicio = new Inicio();

  routes = {
    '/': Inicio.init,
    '/login': this.login,
    '/inicio': Inicio.init,
    '/salir': this.logout,
  };

  setRoutes = () => {
    // console.log('setRoutes', this.routes);
    this.router = new Navigo('/', { hash: true });
    this.router.on(this.routes);
    this.router.notFound(() => {
      ui.pageContent({ title: '404', body: ui.pageNotFound() });
    });
    this.router.resolve();
  };

  init = async () => {
    this.tkSesion = storage.get('tkSesion');
    this.baseHtml();
    if (this.tkSesion) {
      await this.app();
    } else {
      await this.login();
      window.history.replaceState({}, '', '/');
    }
  };
}

// eslint-disable-next-line no-unused-vars
const upnify = new Upnify();
