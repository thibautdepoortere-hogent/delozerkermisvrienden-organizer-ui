import React from "react";
import Knop from "./knop";
import Etiket from "./etiket";

const Titel = ({ id, inhoud, inhoudExtraInfo, tags, acties, niveau = 1 }) => {
  return (
    <div className="titel">
      <div className="titel-inhoud">
        {titelElement(niveau, inhoud)}
        {inhoudExtraInfo && (
          <span className="bp3-text-muted extraInfo">({inhoudExtraInfo})</span>
        )}
        {tags && (
          <div className="titel-tags">
            {tags.map((tag) => (
              <div key={tag.id} className="titel-tags-tag">
                <Etiket
                  key={tag.id}
                  id={id + "Tag"}
                  inhoud={tag.inhoud}
                  intent={tag.intent}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {acties && (
        <div className="titel-acties">
          {acties.map((actie) => (
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
