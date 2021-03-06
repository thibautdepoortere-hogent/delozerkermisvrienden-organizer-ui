import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemNumeriekVak from "./groepItem-numeriekVak";
import * as formulierService from "../../../services/formulierService";

const FormulierGroepNumeriekVak = ({
  id,
  waarde,
  inhoud,
  inhoudHelper,
  inhoudFout,
  placeholder,
  min,
  max,
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
      <FormulierGroepItemNumeriekVak
        id={id}
        waarde={waarde}
        inhoudHelper={inhoudHelper}
        inhoudFout={inhoudFout}
        placeholder={placeholder}
        min={min}
        max={max}
        alleenLezen={alleenLezen}
        onWaardeGewijzigd={onWaardeGewijzigd}
      />
    </div>
  );
};

export default FormulierGroepNumeriekVak;
