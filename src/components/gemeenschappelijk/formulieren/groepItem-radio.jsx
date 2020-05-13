import React from "react";
import { Radio, RadioGroup } from "@blueprintjs/core";

const FormulierGroepItem_Radio = ({
  id,
  waarde,
  opties,
  onInhoudGewijzigd,
}) => {
  return (
    <RadioGroup
      id={id}
      onChange={(e) => onInhoudGewijzigd(e.currentTarget.value)}
      selectedValue={waarde}
    >
      {opties.map((optie) => (
        <Radio key={optie.id} label={optie.naam} value={optie.id} />
      ))}
    </RadioGroup>
  );
};

export default FormulierGroepItem_Radio;
