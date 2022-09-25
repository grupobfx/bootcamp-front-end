import utils from "./utils";
import settings from "./settings";
import menu from "./menu";

class Upnify {
  constructor() {
    console.log('constructor');
    window.addEventListener("load", this.init);
  }

  tkIntegracion = 'ABC';
  tkSesion = null;
  $container = null;

  getTkSesion = async () => {
    const res = await utils.doHttp({
      method: "POST",
      url: settings.resolveUrl({ url: settings.api.sesion }),
      headers: { token: this.tkIntegracion },
    });
    this.tkSesion = res[0].token;
  };

  htmlLoader = () => {
    return `
    <div id="boxLoader">
      <span class="loader">Cargand</span>
    </div>
    `;
  };

  baseHtml = () => {
    const $container = document.querySelector("#app-container");
    this.$container = $container;
    $container.innerHTML = this.htmlLoader();
  };

  initLoaded = () => {
    // this.$container.innerHTML = 'ok';
  };

  init = async () => {
    console.log('init 1');
    this.baseHtml();
    // await this.getTkSesion();
    menu.init();

    this.initLoaded();
  };
}
console.log('app.js');
const upnify = new Upnify();
