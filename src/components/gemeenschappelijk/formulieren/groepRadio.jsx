import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemRadio from "./groepItem-radio";
import * as formulierService from "../../../services/formulierService";

const FormulierGroepRadio = ({
  id,
  inhoud,
  waarde,
  opties,
  inhoudFout,
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
      <FormulierGroepItemRadio
        id={id}
        waarde={waarde}
        opties={opties}
        inhoudFout={inhoudFout}
        onWaardeGewijzigd={onWaardeGewijzigd}
      />
    </div>
  );
};

export default FormulierGroepRadio;
