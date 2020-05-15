import React from "react";
import FormulierGroepTekstvak from "./groepTekstvak";
import BelangrijkeMededeling from "./../belangrijkeMededeling";

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
        <BelangrijkeMededeling
          mededelingen={[
            {
              id: "error",
              inhoud: foutOmschrijving,
            },
          ]}
          intent="Danger"
          icoon="error"
        />
      )}
    </div>
  );
};

export default FormulierGroepMobielNummer;
