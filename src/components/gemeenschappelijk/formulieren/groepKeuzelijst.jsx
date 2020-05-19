import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemKeuzelijst from "./groepItem-keuzelijst";
import * as formulierService from "../../../services/formulierService";

const FormulierGroepKeuzelijst = ({
  id,
  inhoud,
  waarde,
  opties,
  inhoudHelper,
  inhoudFout,
  placeholder,
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
      <FormulierGroepItemKeuzelijst
        id={id}
        waarde={waarde}
        opties={opties}
        inhoudHelper={inhoudHelper}
        inhoudFout={inhoudFout}
        placeholder={placeholder}
        onWaardeGewijzigd={onWaardeGewijzigd}
      />
    </div>
  );
};

export default FormulierGroepKeuzelijst;
