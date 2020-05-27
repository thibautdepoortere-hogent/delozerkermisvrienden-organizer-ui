import React from "react";
import Mededeling from "./gemeenschappelijk/mededeling";

const Uitgelogd = () => {
  return (
    <Mededeling
      id="uitgelogd"
      titel=""
      inhoud="U bent uitgelogd."
      icoon="log-out"
      intent="Primary"
    />
  );
};

export default Uitgelogd;
