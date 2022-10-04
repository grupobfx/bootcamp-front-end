/* eslint-disable class-methods-use-this */
import api from '../api';
import http from '../http';
import ui from '../ui';

class Cuentas {
  getInfo = async (opts) => {
    const data = await http.doHttp({ url: api.cuentas.lista });
    this.cuentasLista({ data, ...opts });
  };

  cuentasLista = (opts) => {
    const { $cardBody, data } = opts;
    const columns = [
      {
        title: '#',
        field: 'id',
        css: 'w50 text-center fw-bold',
      },
      {
        title: 'Cuenta',
        field: 'cuenta',
        template: (d) => (`<a href="/cuentas/${d.id}/${d.cuenta}" data-navigo>${d.cuenta}</a>`),
      },
      {
        title: 'Saldo inicial',
        field: 'saldoInicial',
        css: 'text-end',
      },
      {
        title: 'Saldo',
        field: 'saldo',
        css: 'text-end',
      },
    ];

    $cardBody.innerHTML = ui.buildTable({ data, columns });
    window.appRouter.updatePageLinks();
  };

  init = () => {
    const { $cardBody } = ui.pageContent({ title: 'Cuentas', load: true });
    this.getInfo({ $cardBody });
  };

  detalle = async (opts) => {
    const { $cardBody } = ui.pageContent({ title: `Cuenta - ${opts.data.cuenta}`, load: true });
    const data = await http.doHttp({ url: api.cuentas.detalle(opts.data) });
    const columns = [
      {
        title: '#',
        field: 'id',
        css: 'w50 text-center fw-bold',
      },
      {
        title: 'Descripción',
        field: 'descripcion',
      },
      {
        title: 'Cargo',
        field: 'cargo',
        css: 'text-end',
      },
      {
        title: 'Abono',
        field: 'abono',
        css: 'text-end',
      },
    ];

    $cardBody.innerHTML = ui.buildTable({ data, columns });
    window.appRouter.updatePageLinks();
  };
}
const cuentas = new Cuentas();
export default cuentas;
