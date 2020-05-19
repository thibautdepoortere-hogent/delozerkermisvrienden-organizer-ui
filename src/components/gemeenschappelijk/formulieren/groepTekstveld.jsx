import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemTekstveld from "./groepItem-tekstveld";
import * as formulierService from "../../../services/formulierService";

const FormulierGroepTekstveld = ({
  id,
  waarde,
  inhoud,
  inhoudHelper,
  inhoudFout,
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
      <FormulierGroepItemTekstveld
        id={id}
        waarde={waarde}
        inhoudHelper={inhoudHelper}
        inhoudFout={inhoudFout}
        placeholder={placeholder}
        icoon={icoon}
        alleenLezen={alleenLezen}
        onWaardeGewijzigd={onWaardeGewijzigd}
      />
    </div>
  );
};

export default FormulierGroepTekstveld;
