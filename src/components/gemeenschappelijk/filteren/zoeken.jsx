import React from "react";
import FormulierGroepItemLabel from "./../formulieren/groepItem-label";
import FormulierGroepItemTekstvak from "./../formulieren/groepItem-tekstvak";

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
      <FormulierGroepItemLabel
        id={id}
        omschrijving={omschrijving}
        extraInfo={"wissen"}
        onKlikExtraInfo={onWissenInhoud}
      />
      <FormulierGroepItemTekstvak
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
