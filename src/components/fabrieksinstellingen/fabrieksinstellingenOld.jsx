import React from "./node_modules/react";
import Knop from "../gemeenschappelijk/knop";
import * as api from "../../services/fabrieksinstellingenService";
import * as toaster from "../../services/toasterService";

const FabrieksinstellingenOld = () => {
  return (
    <React.fragmet>
      <h1>Fabrieksinstellingen</h1>
      <p>
        Gebruik deze functie om de standaardwaarden in de database terug in te
        laden.
      </p>
      <Knop naam="Fabrieksinstellingen terugzetten" clickEvent={handleClick} />
    </React.fragmet>
  );
};

async function handleClick() {
  await fabrieksinstellingenTerugzetten();
}

async function fabrieksinstellingenTerugzetten() {
  try {
    await api.fabrieksinstellingenTerugzetten();
  } catch (error) {
    toaster.errorToastAanmaken(
      "Er is een onverwachte fout opgetreden bij het inladen van de inschrijvingen."
    );
  }
}

export default FabrieksinstellingenOld;
