import React from "react";
import Knop from "./knop";

const Titel = ({ id, inhoud, inhoudExtraInfo, acties, niveau = 1 }) => {
  return (
    <div className="titel">
      <div className="titel-inhoud">
        {titelElement(niveau, inhoud)}
        {inhoudExtraInfo && (
          <span className="bp3-text-muted extraInfo">({inhoudExtraInfo})</span>
        )}
      </div>
      {acties && (
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
      )}
    </div>
  );
};

const titelElement = (niveau, inhoud) => {
  switch (niveau) {
    case 1:
    default:
      return <h1 className="titel-titel1">{inhoud}</h1>;
    case 2:
      return <h2 className="titel-titel2">{inhoud}</h2>;
  }
};

export default Titel;
