import React from "react";
import { Callout } from "@blueprintjs/core";

const FormulierGroepItemFout = ({ id, inhoud }) => {
  return (
    <Callout id={id + "Fout"} intent="Danger" icon="issue">
      {inhoud}
    </Callout>
  );
};

export default FormulierGroepItemFout;
