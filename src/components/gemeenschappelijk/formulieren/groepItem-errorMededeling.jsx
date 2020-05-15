import React from "react";
import { Callout } from "@blueprintjs/core";

const FormulierGroepItemErrorMededeling = ({ inhoud }) => {
  return (
    <Callout intent="Danger" icon="issue">
      {inhoud}
    </Callout>
  );
};

export default FormulierGroepItemErrorMededeling;
