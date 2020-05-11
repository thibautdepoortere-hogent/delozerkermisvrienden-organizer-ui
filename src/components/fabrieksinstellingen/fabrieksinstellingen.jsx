import React from "react";
import Knop from "./../gemeenschappelijk/knop";
import * as api from "../../services/api/fabrieksinstellingenService";
import * as toaster from "../../services/toasterService";

const Fabrieksinstellingen = () => {
  return (
    <React.Fragment>
      <h1>Fabrieksinstellingen</h1>
      <div>
        <p>
          Gebruik deze functie om de standaardwaarden in de database terug in te
          laden.
        </p>
        <Knop
          naam="Terugzetten naar fabrieksinstellingen"
          clickEvent={handleClick}
          functie="verwijderen"
        />
      </div>
    </React.Fragment>
  );
};

async function handleClick() {
  await fabrieksinstellingenTerugzetten();
}

async function fabrieksinstellingenTerugzetten() {
  try {
    await api.fabrieksinstellingenTerugzetten();
    toaster.infoToastAanmaken("Teruggezet naar fabrieksinstellingen.");
  } catch (error) {
    toaster.errorToastAanmaken(
      "Er is een onverwachte fout opgetreden bij het inladen van de inschrijvingen."
    );
  }
}

export default Fabrieksinstellingen;
