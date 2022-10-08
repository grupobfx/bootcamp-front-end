import Navigo from 'navigo';

import utils from './utils';
import settings from './settings';
import menu from './menu';
import storage from './storage';
import ui from './ui';
import http from './http';
import api from './api';

import Inicio from './pages/inicio';
import Cuentas from './pages/cuentas';
import Categorias from './pages/categorias';
import Usuarios from './pages/usuarios';

class Upnify {
  constructor() {
    window.addEventListener('load', this.init);
  }

  tkSesion = null;

  userInfo = {};

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

    try {
      const res = await http.doHttp({
        method: 'POST',
        url: api.auth.login,
        payload: values,
        includeSesion: false,
      });
      const { token, ...userInfo } = res;

      storage.set('token', token);
      storage.set('userInfo', userInfo);
      this.userInfo = userInfo;

      await this.app();
      return true;
    } catch (error) {
      const $floatingPassword = document.querySelector('#floatingPassword');
      $floatingPassword.classList.add('is-invalid');
      $floatingPassword.focus();
      const $loginFeedback = document.querySelector('#login-feedback');
      $loginFeedback.innerHTML = error.msg;
      return false;
    }
  };

  app = async () => {
    const { nombre, apellidos, correo } = this.userInfo;
    const html = await http.doHttp({ url: settings.recursos.app, json: false });
    this.baseHtml(html);
    const $userName = document.querySelector('#user-name');
    $userName.innerHTML = `<p class="m-0">${nombre} ${apellidos}</p><p class="m-0 small"><span class="small">${correo}</span></p>`;
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

  routes = {
    '/': Inicio.init,
    '/login': this.login,
    '/salir': this.logout,
    '/inicio': Inicio.init,
    '/cuentas/:id/:cuenta': Cuentas.detalle,
    '/cuentas': Cuentas.init,
    '/categorias': Categorias.init,
    '/usuarios': Usuarios.init,
  };

  setRoutes = () => {
    // console.log('setRoutes', this.routes);
    this.router = new Navigo('/', { hash: true });
    this.router.on(this.routes);
    this.router.notFound(() => {
      ui.pageContent({ title: '404', body: ui.pageNotFound() });
    });
    this.router.resolve();
    window.appRouter = this.router;
  };

  init = async () => {
    this.token = storage.get('token');
    this.baseHtml();
    if (this.token) {
      const userInfo = storage.get('userInfo');
      this.userInfo = userInfo;
      await this.app();
    } else {
      await this.login();
      window.history.replaceState({}, '', '/');
    }
  };
}

// eslint-disable-next-line no-unused-vars
const upnify = new Upnify();
