/* eslint-disable class-methods-use-this */
import api from '../api';
import http from '../http';
import ui from '../ui';

class Usuarios {
  getInfo = async (opts) => {
    const data = await http.doHttp({ url: api.usuarios.lista });
    this.usuariosLista({ data, ...opts });
  };

  usuariosLista = (opts) => {
    const { $cardBody, data } = opts;

    const columns = [
      {
        title: '#',
        field: 'id',
        css: 'w50 text-center fw-bold',
      },
      {
        title: 'Nombre',
        field: 'nombre',
        template: (d) => (`${d.nombre} ${d.apellidos}`),
      },
      {
        title: 'Correo',
        field: 'correo',
      },
    ];

    $cardBody.innerHTML = ui.buildTable({ data, columns });
    window.appRouter.updatePageLinks();
  };

  init = () => {
    const { $cardBody } = ui.pageContent({ title: 'Usuarios', load: true });
    this.getInfo({ $cardBody });
  };
}
const usuarios = new Usuarios();
export default usuarios;
