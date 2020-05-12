import React from "react";
import FormulierGroepItem_Label from "./../formulieren/groepItem-label";
import FormulierGroepItem_Tekstvak from "./../formulieren/groepItem-tekstvak";

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
      <FormulierGroepItem_Label
        id={id}
        omschrijving={omschrijving}
        extraInfo={"wissen"}
        onKlikExtraInfo={onWissenInhoud}
      />
      <FormulierGroepItem_Tekstvak
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
