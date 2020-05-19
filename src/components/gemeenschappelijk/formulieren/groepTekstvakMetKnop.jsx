import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemTekstvak from "./groepItem-tekstvak";
import Knop from "../knop";
import KnopMetLabel from "./../knopMetLabel";

const FormulierGroepTekstvakMetKnop = ({
  id,
  omschrijving,
  waarde,
  icoon,
  placeholder,
  verplicht,
  inactief,
  helperOmschrijving,
  foutOmschrijving,
  onInhoudGewijzigd,
  knopOmschrijving,
  knopIntent,
  onKlik,
}) => {
  return (
    <div className="formulier-groep-altijdSamen">
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
          inactief={inactief}
          helperOmschrijving={helperOmschrijving}
          foutOmschrijving={foutOmschrijving}
          onInhoudGewijzigd={onInhoudGewijzigd}
        />
      </div>
      <div className="formulier-groep-tekstvakKnop-knop">
        <KnopMetLabel
          omschrijving="."
          omschrijvingKnop={knopOmschrijving}
          intent={knopIntent}
          onKlik={onKlik}
        />
      </div>
    </div>
  );
};

function extraInfo(verplicht) {
  if (verplicht) {
    return "Verplicht";
  }
}

export default FormulierGroepTekstvakMetKnop;
