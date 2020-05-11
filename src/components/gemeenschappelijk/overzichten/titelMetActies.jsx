import React from "react";

const OverzichtTitelMetActies = ({ omschrijving, acties }) => {
  return (
    <div className="titelMetAcites">
      <h1 className="titelMetActies-titel">{omschrijving}</h1>
      <div className="titelMetAcites-acties">
        {acties.map((actie) => (
          <button
            key={actie.id}
            type="button"
            className={klassesInladen(
              "bp3-button bp3-outlined titelMetAcites-acties-actie",
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

export default OverzichtTitelMetActies;
