import React from "react";
import { Callout } from "@blueprintjs/core";

const BelangrijkeMededeling = ({ titel, mededeling, intent, icoon }) => {
  return (
    <div className="belangrijkeMededeling">
      <Callout title={titel} intent={intent} icon={icoon}>
        <p>{mededeling}</p>
      </Callout>
    </div>
  );
};

export default BelangrijkeMededeling;
