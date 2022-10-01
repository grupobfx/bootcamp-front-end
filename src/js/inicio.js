import ui from './ui';

const Inicio = function () {
  this.init = () => {
    console.log('inicio');
    const { $container, $cardBody } = ui.pageContent({ title: 'Inicio', load: true });

    setTimeout(() => { $cardBody.innerHTML = 'Listo'; }, 5000);
  };
};
const inicio = new Inicio();
export default inicio;
