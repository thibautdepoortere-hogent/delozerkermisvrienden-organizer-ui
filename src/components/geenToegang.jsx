import React from "react";
import Mededeling from "./gemeenschappelijk/mededeling";

const GeenToegang = () => {
  return (
    <Mededeling
      id="geenToegang"
      titel="U hebt geen toegang tot de gevraagde pagina."
      icoon="info-sign"
      intent="Danger"
    />
  );
};

export default GeenToegang;
