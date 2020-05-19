import React from "react";
import FormulierGroepItemFout from "./groepItem-fout";
import FormulierGroepItemIcoon from "./groepItem-icoon";
import FormulierGroepItemHelper from "./groepItem-helper";

const FormulierGroepItemTekstveld = ({
  id,
  waarde,
  inhoudHelper,
  inhoudFout,
  placeholder,
  icoon,
  alleenLezen,
  onWaardeGewijzigd,
}) => {
  return (
    <div className="bp3-form-content filter-component-item">
      <div className="bp3-input-group">
        {icoon && <FormulierGroepItemIcoon id={id} waarde={icoon} />}
        <textarea
          id={id}
          value={waarde}
          placeholder={placeholder}
          disabled={alleenLezen}
          onChange={(e) => onWaardeGewijzigd(e)}
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

export default FormulierGroepItemTekstveld;
