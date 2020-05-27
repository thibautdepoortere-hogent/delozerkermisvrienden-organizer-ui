import React from "react";
import FormulierGroepItemFout from "./groepItem-fout";
import FormulierGroepItemIcoon from "./groepItem-icoon";
import FormulierGroepItemHelper from "./groepItem-helper";

const FormulierGroepItemTekstvak = ({
  id,
  waarde,
  inhoudHelper,
  inhoudFout,
  wachtwoord,
  placeholder,
  icoon,
  alleenLezen,
  onWaardeGewijzigd,
}) => {
  return (
    <div className="bp3-form-content filter-component-item">
      <div className="bp3-input-group">
        {icoon && <FormulierGroepItemIcoon id={id} waarde={icoon} />}
        <input
          id={id}
          value={waarde}
          placeholder={placeholder}
          disabled={alleenLezen}
          onChange={(e) => onWaardeGewijzigd(e)}
          type={wachtwoord ? "password" : "text"}
          className="bp3-input"
        />
      </div>
      {inhoudHelper && (
        <FormulierGroepItemHelper id={id} inhoud={inhoudHelper} />
      )}
      {inhoudFout && <FormulierGroepItemFout id={id} inhoud={inhoudFout} />}
    </div>
  );
};

export default FormulierGroepItemTekstvak;
