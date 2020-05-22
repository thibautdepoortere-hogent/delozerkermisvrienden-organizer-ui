import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import * as formulierService from "../../../services/formulierService";
import FormulierGroepItemDatumVak from "./groepItem-datumVak";

const FormulierGroepDatumVak = ({
  id,
  waarde,
  inhoud,
  inhoudHelper,
  inhoudFout,
  icoon,
  alleenLezen,
  verplicht,
  onWaardeGewijzigd,
  onFout,
}) => {
  return (
    <div className="bp3-form-group">
      <FormulierGroepItemLabel
        id={id}
        inhoud={inhoud}
        inhoudExtraInfo={formulierService.inhoudVerplichtOphalen(verplicht)}
      />
      <FormulierGroepItemDatumVak
        id={id}
        waarde={waarde}
        inhoudHelper={inhoudHelper}
        inhoudFout={inhoudFout}
        icoon={icoon}
        alleenLezen={alleenLezen}
        onWaardeGewijzigd={onWaardeGewijzigd}
      />
    </div>
  );
};

export default FormulierGroepDatumVak;
