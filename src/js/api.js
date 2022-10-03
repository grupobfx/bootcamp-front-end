import utils from './utils';

const auth = {
  login: '/login',
};

const usuarios = {
  lista: '/usuarios',
};

const cuentas = {
  lista: '/cuentas',
  detalle: (data) => utils.replaceParams('/cuentas/:id/detalle', data),
};

const categorias = {
  lista: '/categorias',
  detalle: (data) => utils.replaceParams('/categorias/:id', data),
  guardar: '/categorias',
  editar: (data) => utils.replaceParams('/categorias/:id', data),
  eliminar: (data) => utils.replaceParams('/categorias/:id', data),
};

export default {
  auth,
  usuarios,
  cuentas,
  categorias,
};
