import React from "react";
import { Radio, RadioGroup } from "@blueprintjs/core";
import Mededeling from "./../mededeling";

const FormulierGroepItemRadio = ({
  id,
  waarde,
  opties,
  inhoudFout,
  onWaardeGewijzigd,
}) => {
  return (
    <div>
      <RadioGroup
        id={id}
        onChange={(e) => onWaardeGewijzigd(e)}
        selectedValue={waarde}
      >
        {opties.map((optie) => (
          <Radio
            id={id}
            key={optie.id}
            label={optie.naam}
            value={optie.id}
            disabled={optie.alleenLezen ? optie.alleenLezen : false}
          />
        ))}
      </RadioGroup>
      {inhoudFout && (
        <Mededeling id={id} inhoud={inhoudFout} icoon="error" intent="Danger" />
      )}
    </div>
  );
};

export default FormulierGroepItemRadio;
