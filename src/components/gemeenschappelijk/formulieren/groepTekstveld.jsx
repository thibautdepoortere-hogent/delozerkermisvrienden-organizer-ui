import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemTekstveld from "./groepItem-tekstveld";

const FormulierGroepTekstveld = ({
  id,
  omschrijving,
  waarde,
  icoon,
  placeholder,
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
      <FormulierGroepItemTekstveld
        id={id}
        waarde={waarde}
        icoon={icoon}
        placeholder={placeholder}
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

export default FormulierGroepTekstveld;
