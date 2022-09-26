import Navigo from "navigo";
import Inicio from './inicio';

const routes = {
  '/': Inicio.init,
  '/#/inicio': Inicio.init,
  '/#/salir': Inicio.init,
};

const setRoutes = () => {
  console.log('setRoutes');
  const router = new Navigo(null, true, '#');
  router.on (routes);
  router.resolve();
  return router;
}

export default setRoutes;