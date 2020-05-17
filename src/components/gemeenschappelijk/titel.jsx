import React from "react";

const Titel = ({ omschrijving, extraInfo, acties }) => {
  return (
    <div className="titel">
      <h1 className="titel-titel">{omschrijving}</h1>
      {extraInfo && (
        <span className="bp3-text-muted extraInfo">({extraInfo})</span>
      )}
      <div className="titel-acties">
        {acties &&
          acties.map((actie) => (
            <button
              key={actie.id}
              type="button"
              className={klassesInladen(
                "bp3-button bp3-outlined titel-acties-actie",
                actie.intent
              )}
              onClick={() => actie.onActieGeklikt()}
            >
              {actie.omschrijving}
            </button>
          ))}
      </div>
    </div>
  );
};

function klassesInladen(standaardKlasse, intent) {
  let klasse = standaardKlasse + " ";
  if (intent) {
    klasse = klasse + "bp3-intent-" + intent;
  }
  return klasse;
}

export default Titel;
