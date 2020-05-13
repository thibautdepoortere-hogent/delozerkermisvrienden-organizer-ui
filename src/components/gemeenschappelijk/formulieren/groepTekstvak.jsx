import React from "react";
import FormulierGroepItem_Label from "./groepItem-label";
import FormulierGroepItem_Tekstvak from "./groepItem-tekstvak";

const FormulierGroepTekstvak = ({
  id,
  omschrijving,
  waarde,
  icoon,
  placeholder,
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
      <FormulierGroepItem_Tekstvak
        id={id}
        waarde={waarde}
        placeholder={placeholder}
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

export default FormulierGroepTekstvak;
