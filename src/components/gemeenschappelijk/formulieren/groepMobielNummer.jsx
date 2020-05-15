import React from "react";
import FormulierGroepTekstvak from "./groepTekstvak";

const FormulierGroepMobielNummer = ({
  idPrefix,
  idMobielNummer,
  waardePrefix,
  waardeMobielNummer,
  verplicht,
  onInhoudGewijzigdPrefix,
  onInhoudGewijzigdMobielNummer,
}) => {
  return (
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
  );
};

export default FormulierGroepMobielNummer;
