import React from "react";
import FormulierGroepItemHelper from "./groepItem-helper";
import Mededeling from "../mededeling";

const FormulierGroepItemKeuzelijst = ({
  id,
  waarde,
  opties,
  inhoudHelper,
  inhoudFout,
  placeholder,
  onWaardeGewijzigd,
}) => {
  return (
    <div class="bp3-select">
      <select id={id} onChange={(e) => onWaardeGewijzigd(e)} Value={waarde}>
        <option selected>{placeholder}</option>
        {opties.map((optie) => (
          <option
            id={id}
            key={optie.id}
            value={optie.id}
            disabled={optie.alleenLezen ? optie.alleenLezen : false}
          >
            {optie.naam}
          </option>
        ))}
      </select>
      {inhoudHelper && (
        <FormulierGroepItemHelper id={id} inhoud={inhoudHelper} />
      )}
      {inhoudFout && (
        <Mededeling id={id} inhoud={inhoudFout} icoon="error" intent="Danger" />
      )}
    </div>
  );
};

export default FormulierGroepItemKeuzelijst;
