import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemRadio from "./groepItem-radio";

const FormulierGroepRadio = ({
  id,
  omschrijving,
  waarde,
  data,
  verplicht,
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
      <FormulierGroepItemRadio
        id={id}
        waarde={waarde}
        opties={data}
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

export default FormulierGroepRadio;
