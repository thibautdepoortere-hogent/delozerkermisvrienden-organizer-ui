import React from "react";
import { NumericInput } from "@blueprintjs/core";
import FormulierGroepItemFout from "./groepItem-fout";
import FormulierGroepItemHelper from "./groepItem-helper";

const FormulierGroepItemNumeriekVak = ({
  id,
  waarde,
  inhoudHelper,
  inhoudFout,
  placeholder,
  min,
  max,
  alleenLezen,
  onWaardeGewijzigd,
}) => {
  return (
    <div className="bp3-form-content filter-component-item">
      <div>
        <NumericInput
          id={id}
          value={waarde}
          placeholder={placeholder}
          min={min}
          max={max}
          disabled={alleenLezen}
          onValueChange={onWaardeGewijzigd}
          fill={true}
        />
      </div>
      <FormulierGroepItemHelper id={id} inhoud={inhoudHelper} />
      {inhoudFout && <FormulierGroepItemFout id={id} inhoud={inhoudFout} />}
    </div>
  );
};

export default FormulierGroepItemNumeriekVak;
