import React from "react";

const FormulierGroepTekstvak = ({
  id,
  waarde,
  placeholder,
  icoon,
  helperOmschrijving,
  onInhoudGewijzigd,
}) => {
  return (
    <div className="bp3-form-content filter-component-item">
      <div className="bp3-input-group">
        {icoon && <span className={icoonKlasse(icoon)}></span>}
        <input
          id={id}
          type="text"
          className="bp3-input"
          placeholder={placeholder}
          value={waarde}
          onChange={(e) => onInhoudGewijzigd(e.currentTarget.value)}
        />
      </div>
      {helperOmschrijving && (
        <div className="bp3-form-helper-text">{helperOmschrijving}</div>
      )}
    </div>
  );
};

function icoonKlasse(icoon) {
  return "bp3-icon bp3-icon-" + icoon;
}

export default FormulierGroepTekstvak;
