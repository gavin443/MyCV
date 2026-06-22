let formSchema = [];
let selectedFieldId = null;
let dragType = null;
const canvas = document.getElementById("canvas");

// Drag fields
document.querySelectorAll(".palette-item").forEach((el) => {
  el.addEventListener("dragstart", (e) => {
    dragType = el.dataset.type;
  });
});

function addRow(cols) {
  formSchema.push({
    id: crypto.randomUUID(),
    type: "row",
    columns: cols.map((c) => ({ width: c, fields: [] })),
  });
  renderCanvas();
}

function renderCanvas() {
  canvas.innerHTML = "";

  formSchema.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row row-drop";

    row.columns.forEach((col) => {
      const colDiv = document.createElement("div");
      colDiv.className = `col-${col.width}`;

      const dropZone = document.createElement("div");
      dropZone.className = "col-drop";

      dropZone.addEventListener("dragover", (e) => e.preventDefault());

      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();

        const field = {
          id: crypto.randomUUID(),
          type: dragType,
          label: dragType.toUpperCase(),
          name: dragType + "_" + Date.now(),
          required: false,
        };

        col.fields.push(field);
        renderCanvas();
      });

      col.fields.forEach((field) => {
        const fieldDiv = document.createElement("div");
        fieldDiv.className = "field-card";

        fieldDiv.innerHTML = `
          <div class="field-actions">
            <button onclick="deleteField('${row.id}','${field.id}')">❌</button>
          </div>
          <label>${field.label}</label>
          ${renderInput(field)}
        `;

        fieldDiv.onclick = () => {
          console.log("here2");
          selectField(row.id, field.id);
        };

        dropZone.appendChild(fieldDiv);
      });

      colDiv.appendChild(dropZone);
      rowDiv.appendChild(colDiv);
    });

    canvas.appendChild(rowDiv);
  });
}

function renderInput(field) {
  switch (field.type) {
    case "text":
      return '<input class="form-control" />';
    case "number":
      return '<input type="number" class="form-control" />';
    case "select":
      return '<select class="form-select"><option>Select...</option></select>';
    case "date":
      return '<input type="date" class="form-control" />';
  }
}

function deleteField(rowId, fieldId) {
  console.log("here");
  const row = formSchema.find((r) => r.id === rowId);
  row.columns.forEach((c) => {
    c.fields = c.fields.filter((f) => f.id !== fieldId);
  });
  renderCanvas();
}

function selectField(rowId, fieldId) {
  const row = formSchema.find((r) => r.id === rowId);
  let field;
  row.columns.forEach((c) => {
    const f = c.fields.find((x) => x.id === fieldId);
    if (f) field = f;
  });

  if (field) {
    selectedFieldId = fieldId;

    document.getElementById("editor").innerHTML = `
    <label>Label</label>
    <input class="form-control" value="${field.label}" oninput="updateField('${rowId}','${fieldId}','label', this.value)" />

    <label>Name</label>
    <input class="form-control" value="${field.name}" oninput="updateField('${rowId}','${fieldId}','name', this.value)" />

    <div class="form-check mt-2">
      <input class="form-check-input" type="checkbox" ${field.required ? "checked" : ""}
        onchange="updateField('${rowId}','${fieldId}','required', this.checked)">
      <label class="form-check-label">Required</label>
    </div>
  `;
  }
}

function updateField(rowId, fieldId, prop, value) {
  const row = formSchema.find((r) => r.id === rowId);
  row.columns.forEach((c) => {
    const field = c.fields.find((f) => f.id === fieldId);
    if (field) field[prop] = value;
  });
  renderCanvas();
}

function exportForm() {
  console.log(JSON.stringify(formSchema, null, 2));
}
