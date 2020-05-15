import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemTekstvak from "./groepItem-tekstvak";

const FormulierGroepTekstvak = ({
  id,
  omschrijving,
  waarde,
  icoon,
  placeholder,
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
      <FormulierGroepItemTekstvak
        id={id}
        waarde={waarde}
        placeholder={placeholder}
        icoon={icoon}
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

export default FormulierGroepTekstvak;
