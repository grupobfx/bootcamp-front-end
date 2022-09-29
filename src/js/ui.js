
const doOptions = (opts) => {
  const { data, value, option } = opts;
  if (!data) {
    return "";
  }

  return data
    .map((d) => {
      return `<option value="${d[value]}">${d[option]}</option>`;
    })
    .join("");
};

const buildTable = (opts) => {
  const { data } = opts;
  if (!data) {
    return "";
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

const buildTableHead = (opts) => {
  const { columns } = opts;
  if (!columns) {
    return "";
  }

  return `
  <thead>
    <tr>
      ${columns
        .map((column) => {
          const { css = "", title } = column;

          return `<th class="${css}">${title}</th>`;
        })
        .join("")}
    </tr>
  </thead>`;
};

const buildTableBody = (opts) => {
  const { columns, data } = opts;
  if (!columns) {
    return "";
  }

  return `<tbody class="table-group-divider">
    ${data.map((d) => {
      return `
        <tr>${columns
            .map((column) => {
              const { css = "", field } = column;
              const value = d[field];
              return `<td class="${css}">${value || ""}</td>`;
            })
            .join("")}
        </tr>
      `;
    }).join("")}
  </tbody>`;
};

const loader = () => {
  return `
  <div id="boxLoader">
    <span class="loader">Cargand</span>
  </div>
  `;
}

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

export default {
  doOptions,
  buildTable,
  pageContent,
  loader,
};
