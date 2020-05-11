import React from "react";

const Keuzelijst = ({ id, omschrijving, extraInfo, placeholder, data }) => {
  return (
    <div class="bp3-form-group">
      <label class="bp3-label" for={id}>
        {omschrijving}
        {extraInfo && <span class="bp3-text-muted">({extraInfo})</span>}
      </label>
      <div class="bp3-form-content">
        <div class="bp3-input-group .modifier">
          <div class="bp3-select">
            <select id={id}>
              {placeholder && <option selected>{placeholder}</option>}
              {data.map((d) => (
                <option value={d.id}>{d.naam}</option>
              ))}
            </select>
          </div>
        </div>
        {helperInfo && <div class="bp3-form-helper-text">{helperInfo}</div>}
      </div>
    </div>
  );
};

export default Keuzelijst;
