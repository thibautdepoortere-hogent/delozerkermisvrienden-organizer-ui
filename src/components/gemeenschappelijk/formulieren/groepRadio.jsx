import React from "react";
import FormulierGroepItem_Label from "./groepItem-label";
import FormulierGroepItem_Tekstvak from "./groepItem-tekstvak";
import FormulierGroepItem_Radio from "./groepItem-radio";

const FormulierGroepRadio = ({
  id,
  omschrijving,
  waarde,
  data,
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
      <FormulierGroepItem_Radio
        id={id}
        waarde={waarde}
        opties={data}
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
