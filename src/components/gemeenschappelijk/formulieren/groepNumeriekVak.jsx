import React from "react";
import FormulierGroepItem_Label from "./groepItem-label";
import FormulierGroepItem_NumeriekVak from "./groepItem-numeriekVak";

const FormulierGroepNumeriekVak = ({
  id,
  enkelLezen,
  omschrijving,
  waarde,
  min,
  max,
  icoon,
  verplicht,
  helperOmschrijving,
  onInhoudGewijzigd,
}) => {
  return (
    <div className="bp3-form-group">
      <FormulierGroepItem_Label
        id={id}
        omschrijving={omschrijving}
        extraInfo={extraInfo(verplicht)}
      />
      <FormulierGroepItem_NumeriekVak
        id={id}
        enkelLezen={enkelLezen}
        waarde={waarde}
        min={min}
        max={max}
        icoon={icoon}
        helperOmschrijving={helperOmschrijving}
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
