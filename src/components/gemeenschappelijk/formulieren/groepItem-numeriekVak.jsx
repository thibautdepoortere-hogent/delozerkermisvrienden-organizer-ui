import React from "react";
import { NumericInput } from "@blueprintjs/core";

const FormulierGroepItem_NumeriekVak = ({
  id,
  enkelLezen,
  waarde,
  min,
  max,
  icoon,
  helperOmschrijving,
  onInhoudGewijzigd,
}) => {
  return (
    <div className="bp3-form-content filter-component-item">
      <div>
        {icoon && <span className={icoonKlasse(icoon)}></span>}
        <NumericInput
          id={id}
          disabled={enkelLezen}
          fill={true}
          value={waarde}
          min={min}
          max={max}
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

export default FormulierGroepItem_NumeriekVak;
