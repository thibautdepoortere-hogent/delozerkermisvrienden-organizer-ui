import React from "react";
import FormulierGroepTekstvak from "./groepTekstvak";
import FormulierGroepItemFout from "./groepItem-fout";
import FormulierGroepItemHelper from "./groepItem-helper";

const FormulierGroepMobielNummer = ({
  id,
  idPrefix,
  idMobielNummer,
  waardePrefix,
  waardeMobielNummer,
  inhoudHelper,
  inhoudFout,
  alleenLezen,
  verplicht,
  onWaardeGewijzigdPrefix,
  onWaardeGewijzigdMobielNummer,
}) => {
  return (
    <div id={id}>
      <div className="formulier-groep-altijdSamen">
        <div className="formulier-groep-item-landnummer">
          <FormulierGroepTekstvak
            id={idPrefix}
            inhoud="Landnummer"
            waarde={waardePrefix}
            placeholder={alleenLezen ? "" : "32"}
            icoon="plus"
            alleenLezen={alleenLezen}
            onWaardeGewijzigd={onWaardeGewijzigdPrefix}
          />
        </div>
        <div className="formulier-groep-item-mobielnummer">
          <FormulierGroepTekstvak
            id={idMobielNummer}
            inhoud="Mobiel nummer"
            waarde={waardeMobielNummer}
            placeholder={alleenLezen ? "" : "474123456"}
            icoon="phone"
            alleenLezen={alleenLezen}
            verplicht={verplicht}
            onWaardeGewijzigd={onWaardeGewijzigdMobielNummer}
          />
        </div>
      </div>
      {inhoudHelper && (
        <FormulierGroepItemHelper id={idMobielNummer} inhoud={inhoudHelper} />
      )}
      {inhoudFout && (
        <FormulierGroepItemFout id={idMobielNummer} inhoud={inhoudFout} />
      )}
    </div>
  );
};

export default FormulierGroepMobielNummer;
