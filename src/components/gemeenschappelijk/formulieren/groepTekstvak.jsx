import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemTekstvak from "./groepItem-tekstvak";
import * as formulierService from "../../../services/formulierService";

const FormulierGroepTekstvak = ({
  id,
  waarde,
  inhoud,
  inhoudHelper,
  inhoudFout,
  wachtwoord,
  placeholder,
  icoon,
  alleenLezen,
  verplicht,
  onWaardeGewijzigd,
}) => {
  return (
    <div className="bp3-form-group">
      <FormulierGroepItemLabel
        id={id}
        inhoud={inhoud}
        inhoudExtraInfo={formulierService.inhoudVerplichtOphalen(verplicht)}
      />
      <FormulierGroepItemTekstvak
        id={id}
        waarde={waarde}
        inhoudHelper={inhoudHelper}
        inhoudFout={inhoudFout}
        wachtwoord={wachtwoord}
        placeholder={placeholder}
        icoon={icoon}
        alleenLezen={alleenLezen}
        onWaardeGewijzigd={onWaardeGewijzigd}
      />
    </div>
  );
};

export default FormulierGroepTekstvak;
