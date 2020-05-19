import React from "react";
import FormulierGroepItemLabelExtraInfo from "./groepItem-label-extraInfo";

const FormulierGroepItemLabel = ({
  id,
  inhoud,
  inhoudExtraInfo,
  onKlikExtraInfo,
}) => {
  return (
    <label id={id + "Label"} className="bp3-label" htmlFor={id}>
      {inhoud + " "}
      <FormulierGroepItemLabelExtraInfo
        id={id + "Label"}
        inhoud={inhoudExtraInfo}
        onKlik={onKlikExtraInfo}
      />
    </label>
  );
};

export default FormulierGroepItemLabel;
