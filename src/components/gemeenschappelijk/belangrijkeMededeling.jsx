import React from "react";
import { Callout } from "@blueprintjs/core";

const BelangrijkeMededeling = ({ titel, mededelingen, intent, icoon }) => {
  return (
    <div className="belangrijkeMededeling">
      <Callout title={titel} intent={intent} icon={icoon}>
        {mededelingen.map((mededeling) => (
          <p key={mededeling.id}>{mededeling.inhoud}</p>
        ))}
      </Callout>
    </div>
  );
};

export default BelangrijkeMededeling;
{
}
