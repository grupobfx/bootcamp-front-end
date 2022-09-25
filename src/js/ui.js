
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

export default {
  doOptions,
  buildTable,
};
