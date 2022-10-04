const doOptions = (opts) => {
  const { data, value, option } = opts;
  if (!data) {
    return '';
  }

  return data
    .map((d) => `<option value="${d[value]}">${d[option]}</option>`)
    .join('');
};

const emptyTable = (columns) => {
  const nColumns = columns.length;
  return `
  <tbody class="table-group-divider">
    <tr>
      <td class="p-0" colspan="${nColumns}">
        <div class="alert alert-info m-0 p-2 text-center fs-6" role="alert">
          Sin información
        </div>
      </td>
    </tr>
  </tbody>`;
};

const buildTableHead = (opts) => {
  const { columns } = opts;
  if (!columns) {
    return '';
  }

  return `
  <thead>
    <tr>
      ${columns
    .map((column) => {
      const { css = '', title } = column;

      return `<th class="${css}">${title}</th>`;
    })
    .join('')}
    </tr>
  </thead>`;
};

const buildTableBody = (opts) => {
  const { columns, data = [] } = opts;
  if (!columns) { return ''; }

  if (!data.length) {
    return emptyTable(columns);
  }
  return `<tbody class="table-group-divider">
    ${data.map((d) => `
        <tr>${columns
    .map((column) => {
      const { css = '', field, template } = column;
      const value = template ? template(d) : d[field];
      return `<td class="${css}">${value || ''}</td>`;
    })
    .join('')}
        </tr>
      `).join('')}
  </tbody>`;
};

const buildTable = (opts) => {
  const { data } = opts;
  if (!data) {
    return '';
  }

  return `
  <div class="table-responsive">
    <table class="table table-striped _table-striped-columns table-hover table-sm">
      ${buildTableHead(opts)}
      ${buildTableBody(opts)}
    </table>
  </div>
  `;
};

const loader = () => `
  <div id="boxLoader">
    <span class="loader">Cargand</span>
  </div>
  `;

const pageContent = (opts) => {
  const { title, body = '', load = false } = opts;
  const htmlLoad = load ? loader() : '';
  const htmlContent = `
    <div class="d-sm-flex align-items-center justify-content-between mb-4 border-bottom border-2 border-secondary pb-1">
      <h3 class="h3 mb-0 text-gray-800">${title}</h3>
    </div>

    <div class="card">
      <div class="card-body" id="card-body">${body}${htmlLoad}</div>
    </div>
  `;
  const $container = document.querySelector('#app-container');
  $container.innerHTML = htmlContent;
  const $cardBody = $container.querySelector('#card-body');

  return { htmlContent, $container, $cardBody };
};

const pageNotFound = () => `
  <div class="text-center">
    <div class="error mx-auto" data-text="404">404</div>
    <p class="lead text-gray-800 mb-5">Pagina no encontrada</p>
    <p class="text-gray-500 mb-0">Parece que has encontrado un fallo en la matrix...</p>
    <a href="/inicio" data-navigo>Inicio</a>
  </div>
`;

export default {
  doOptions,
  buildTable,
  pageContent,
  loader,
  pageNotFound,
};
