import React from "react";
import Titel from "./../gemeenschappelijk/titel";
import Knop from "./../gemeenschappelijk/knop";
import * as api from "../../services/api/fabrieksinstellingenService";
import * as toaster from "../../services/toasterService";

const Fabrieksinstellingen = () => {
  return (
    <React.Fragment>
      <Titel omschrijving="Fabrieksinstellingen" />
      <div>
        <p>
          Gebruik deze functie om de standaardwaarden in de database terug in te
          laden.
        </p>
        <Knop
          id="fabrieksinstellingenKnop"
          inhoud="Terugzetten naar fabrieksinstellingen"
          intent="danger"
          onKlik={handleClick}
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
      "Er is een onverwachte fout opgetreden bij het instellen van de fabrieksinstellingen."
    );
  }
}

export default Fabrieksinstellingen;
