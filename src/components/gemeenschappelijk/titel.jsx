import React from "react";
import Knop from "./knop";

const Titel = ({ id, inhoud, inhoudExtraInfo, acties }) => {
  return (
    <div className="titel">
      <h1 className="titel-titel">{inhoud}</h1>
      {inhoudExtraInfo && (
        <span className="bp3-text-muted extraInfo">({inhoudExtraInfo})</span>
      )}
      <div className="titel-acties">
        {acties &&
          acties.map((actie) => (
            <div key={actie.id} className="titel-acties-actie">
              <Knop
                key={actie.id}
                id={id + "Knop"}
                inhoud={actie.inhoud}
                intent={actie.intent}
                outlined={true}
                onKlik={() => actie.onKlik()}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Titel;
