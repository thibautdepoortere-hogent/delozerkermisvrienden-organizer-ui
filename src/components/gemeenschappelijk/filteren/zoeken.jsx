import React from "react";
import FormulierGroepLabel from "../formulieren/groepLabel";
import FormulierGroepTekstvak from "../formulieren/groepTekstvak";

const FilterZoeken = ({
  id,
  omschrijving,
  waarde,
  placeholder,
  onInhoudGewijzigd,
  onWissenInhoud,
}) => {
  return (
    <div className="bp3-form-group filter-component">
      <FormulierGroepLabel
        id={id}
        omschrijving={omschrijving}
        extraInfo={"wissen"}
        onKlikExtraInfo={onWissenInhoud}
      />
      <FormulierGroepTekstvak
        id={id}
        waarde={waarde}
        placeholder={placeholder}
        icoon="search"
        onInhoudGewijzigd={onInhoudGewijzigd}
      />
    </div>
  );
};

export default FilterZoeken;
