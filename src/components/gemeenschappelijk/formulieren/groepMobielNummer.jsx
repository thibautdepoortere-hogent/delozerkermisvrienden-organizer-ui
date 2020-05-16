import React from "react";
import FormulierGroepTekstvak from "./groepTekstvak";
import FormulierGroepItemErrorMededeling from "./groepItem-errorMededeling";

const FormulierGroepMobielNummer = ({
  idPrefix,
  idMobielNummer,
  waardePrefix,
  waardeMobielNummer,
  verplicht,
  foutOmschrijving,
  onInhoudGewijzigdPrefix,
  onInhoudGewijzigdMobielNummer,
}) => {
  return (
    <div>
      <div className="formulier-groep-altijdSamen">
        <div className="formulier-groep-item-landnummer">
          <FormulierGroepTekstvak
            id={idPrefix}
            omschrijving="Landnummer"
            waarde={waardePrefix}
            icoon="plus"
            placeholder="32"
            onInhoudGewijzigd={onInhoudGewijzigdPrefix}
          />
        </div>
        <div className="formulier-groep-item-mobielnummer">
          <FormulierGroepTekstvak
            id={idMobielNummer}
            omschrijving="Mobiel nummer"
            waarde={waardeMobielNummer}
            icoon="phone"
            placeholder="474123456"
            verplicht={verplicht}
            onInhoudGewijzigd={onInhoudGewijzigdMobielNummer}
          />
        </div>
      </div>
      {foutOmschrijving && (
        <FormulierGroepItemErrorMededeling inhoud={foutOmschrijving} />
      )}
    </div>
  );
};

export default FormulierGroepMobielNummer;
