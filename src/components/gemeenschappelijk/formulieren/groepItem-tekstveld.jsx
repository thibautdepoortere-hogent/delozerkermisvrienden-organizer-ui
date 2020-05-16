import React from "react";
import FormulierGroepItemErrorMededeling from "./groepItem-errorMededeling";

const FormulierGroepItemTekstveld = ({
  id,
  waarde,
  placeholder,
  icoon,
  helperOmschrijving,
  foutOmschrijving,
  onInhoudGewijzigd,
}) => {
  return (
    <div className="bp3-form-content filter-component-item">
      <div className="bp3-input-group">
        {icoon && <span className={icoonKlasse(icoon)}></span>}
        <textarea
          id={id}
          className="bp3-input"
          placeholder={placeholder}
          value={waarde}
          onChange={(e) => onInhoudGewijzigd(e)}
        />
      </div>
      {helperOmschrijving && (
        <div className="bp3-form-helper-text">{helperOmschrijving}</div>
      )}
      {foutOmschrijving && (
        <FormulierGroepItemErrorMededeling inhoud={foutOmschrijving} />
      )}
    </div>
  );
};

function icoonKlasse(icoon) {
  return "bp3-icon bp3-icon-" + icoon;
}

export default FormulierGroepItemTekstveld;
