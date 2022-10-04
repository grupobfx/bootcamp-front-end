/* eslint-disable class-methods-use-this */
import api from '../api';
import http from '../http';
import ui from '../ui';

class Categorias {
  getInfo = async (opts) => {
    const data = await http.doHttp({ url: api.categorias.lista });
    this.categoriasLista({ data, ...opts });
  };

  categoriasLista = (opts) => {
    const { $cardBody, data } = opts;

    const columns = [
      {
        title: '#',
        field: 'id',
        css: 'w50 text-center fw-bold',
      },
      {
        title: 'Categoria',
        field: 'categoria',
        template: (d) => (`<a href="/cuentas/${d.id}/${d.cuenta}" data-navigo>${d.cuenta}</a>`),
      },
    ];

    $cardBody.innerHTML = ui.buildTable({ data, columns });
    window.appRouter.updatePageLinks();
  };

  init = () => {
    const { $cardBody } = ui.pageContent({ title: 'Categorías', load: true });
    this.getInfo({ $cardBody });
  };
}
const categorias = new Categorias();
export default categorias;
