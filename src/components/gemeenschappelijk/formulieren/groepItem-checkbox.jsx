import React from "react";
import FormulierGroepItemFout from "./groepItem-fout";
import FormulierGroepItemIcoon from "./groepItem-icoon";
import FormulierGroepItemHelper from "./groepItem-helper";
import { Checkbox } from "@blueprintjs/core";

const FormulierGroepItemCheckbox = ({
  id,
  waarde,
  inhoud,
  inhoudHelper,
  inhoudFout,
  alleenLezen,
  onWaardeGewijzigd,
}) => {
  return (
    <div className="bp3-form-content filter-component-item">
      {/* <div className="bp3-input-group">
        <label className="bp3-control bp3-checkbox">
          <input
            id={id}
            checked={waarde}
            disabled={alleenLezen}
            onChange={(e) => onWaardeGewijzigd(e)}
            type="checkbox"
          />
          <span className="bp3-control-indicator"></span>
          {inhoud}
        </label>
      </div> */}
      <Checkbox
        id={id}
        checked={waarde}
        label={inhoud}
        disabled={alleenLezen}
        onChange={(e) => onWaardeGewijzigd(e)}
      />
      {inhoudHelper && (
        <FormulierGroepItemHelper id={id} inhoud={inhoudHelper} />
      )}
      {inhoudFout && <FormulierGroepItemFout id={id} inhoud={inhoudFout} />}
    </div>
  );
};

export default FormulierGroepItemCheckbox;
