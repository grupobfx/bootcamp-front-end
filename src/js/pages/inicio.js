/* eslint-disable class-methods-use-this */
import { Chart, BarElement, BarController } from 'chart.js';

import ui from '../ui';

Chart.register(BarElement, BarController);
class Inicio {
  // constructor() {}

  init = async () => {
    const { $cardBody } = ui.pageContent({ title: 'Inicio', load: true });
    this.getInfo({ $cardBody });
  };

  getInfo = (opts) => {
    const { $cardBody } = opts;

    $cardBody.innerHTML = '<canvas class="mh-500" id="myChart" _height="200"></canvas>';

    const $chart = document.querySelector('#myChart');

    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
    const data = {
      labels,
      datasets: [{
        label: 'Gastos del mes actua',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      }],
    };
    const config = {
      type: 'bar',
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart = new Chart($chart, config);
    myChart.resize();
  };
}

const inicio = new Inicio();
export default inicio;
