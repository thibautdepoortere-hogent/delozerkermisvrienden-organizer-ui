import React from "react";
import FormulierGroepItem_Label from "./groepItem-label";
import FormulierGroepItem_Tekstveld from "./groepItem-tekstveld";

const FormulierGroepTekstveld = ({
  id,
  omschrijving,
  waarde,
  icoon,
  placeholder,
  verplicht,
  onInhoudGewijzigd,
}) => {
  return (
    <div className="bp3-form-group">
      <FormulierGroepItem_Label
        id={id}
        omschrijving={omschrijving}
        extraInfo={extraInfo(verplicht)}
      />
      <FormulierGroepItem_Tekstveld
        id={id}
        waarde={waarde}
        placeholder={placeholder}
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
