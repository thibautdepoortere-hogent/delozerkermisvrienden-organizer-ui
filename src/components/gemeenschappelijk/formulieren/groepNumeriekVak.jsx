import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemNumeriekVak from "./groepItem-numeriekVak";

const FormulierGroepNumeriekVak = ({
  id,
  enkelLezen,
  omschrijving,
  waarde,
  min,
  max,
  verplicht,
  helperOmschrijving,
  foutOmschrijving,
  onInhoudGewijzigd,
}) => {
  return (
    <div className="bp3-form-group">
      <FormulierGroepItemLabel
        id={id}
        omschrijving={omschrijving}
        extraInfo={extraInfo(verplicht)}
      />
      <FormulierGroepItemNumeriekVak
        id={id}
        enkelLezen={enkelLezen}
        waarde={waarde}
        min={min}
        max={max}
        helperOmschrijving={helperOmschrijving}
        foutOmschrijving={foutOmschrijving}
        onInhoudGewijzigd={onInhoudGewijzigd}
      />
    </div>
  );
};

function extraInfo(verplicht) {
  if (verplicht) {
    return "Verplicht";
  }
}

export default FormulierGroepNumeriekVak;
