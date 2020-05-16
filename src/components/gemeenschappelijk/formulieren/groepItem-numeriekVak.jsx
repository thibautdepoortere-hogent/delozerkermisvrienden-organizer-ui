import React from "react";
import { NumericInput } from "@blueprintjs/core";
import FormulierGroepItemErrorMededeling from "./groepItem-errorMededeling";

const FormulierGroepItemNumeriekVak = ({
  id,
  enkelLezen,
  waarde,
  min,
  max,
  helperOmschrijving,
  foutOmschrijving,
  onInhoudGewijzigd,
}) => {
  return (
    <div className="bp3-form-content filter-component-item">
      <div>
        <NumericInput
          id={id}
          disabled={enkelLezen}
          fill={true}
          value={waarde}
          min={min}
          max={max}
          onValueChange={onInhoudGewijzigd}
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

export default FormulierGroepItemNumeriekVak;
