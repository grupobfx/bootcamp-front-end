/* eslint-disable no-undef */

import utilsTest from './utilsTest';
import ui from '../src/js/ui';

test('doOptions', () => {
  const arrTest = [
    {
      data: null,
      value: 'tkOpcion',
      option: 'opcion',
      html: '',
    },
    {
      data: [],
      value: 'tkOpcion',
      option: 'opcion',
      html: '',
    },
    {
      data: [
        {
          tkOpcion: 'ABC',
          opcion: 'Primera',
        },
      ],
      value: 'tkOpcion',
      option: 'opcion',
      html: '<option value="ABC">Primera</option>',
    },
    {
      data: [
        {
          tkOpcion: 'ABCD',
          opcion: 'Primera',
        },
      ],
      value: 'tkOpcion',
      option: 'opcion',
      html: '<option value="ABCD">Primera</option>',
    },
  ];

  arrTest.forEach((test) => {
    const { html } = test;
    const htmlOptions = ui.doOptions(test);
    expect(htmlOptions).toBe(html);
  });
});

test('loader', () => {
  const html = utilsTest.cleanString('<div id="boxLoader"><span class="loader">Cargand</span></div>');
  const resHtml = utilsTest.cleanString(ui.loader());
  expect(resHtml).toBe(html);
});
