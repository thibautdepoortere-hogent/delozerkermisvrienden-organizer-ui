import React from "react";
import { Callout } from "@blueprintjs/core";

const Mededeling = ({ id, titel, inhoud, icoon, intent }) => {
  return (
    <div id={id} className="mededeling">
      <Callout
        id={id + "Mededeling"}
        title={titel}
        icon={icoon}
        intent={intent}
      >
        <p>{inhoud}</p>
      </Callout>
    </div>
  );
};

export default Mededeling;
