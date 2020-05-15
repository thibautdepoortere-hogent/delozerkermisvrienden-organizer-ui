import React from "react";
import { Radio, RadioGroup } from "@blueprintjs/core";
import BelangrijkeMededeling from "./../belangrijkeMededeling";

const FormulierGroepItemRadio = ({
  id,
  waarde,
  opties,
  foutOmschrijving,
  onInhoudGewijzigd,
}) => {
  return (
    <div>
      <RadioGroup
        id={id}
        onChange={(e) => onInhoudGewijzigd(e)}
        selectedValue={waarde}
      >
        {opties.map((optie) => (
          <Radio id={id} key={optie.id} label={optie.naam} value={optie.id} />
        ))}
      </RadioGroup>
      {foutOmschrijving && (
        <BelangrijkeMededeling
          mededelingen={[
            {
              id: "error",
              inhoud: foutOmschrijving,
            },
          ]}
          intent="Danger"
          icoon="error"
        />
      )}
    </div>
  );
};

export default FormulierGroepItemRadio;
