import React from "react";
import { formatteerCell } from "../../../services/formatteerService";
import KnopOud from "../knopOud";

const TabelInhoudCel = ({ kolom, object }) => {
  return (
    <td
      key={object.id + "_" + kolom.id}
      className={kolom.verbergBijSmaller ? "verbergBijSmaller" : ""}
    >
      {tabelInhoudCelAanmaken(kolom, object)}
    </td>
  );
};

const tabelInhoudCelAanmaken = (kolom, object) => {
  let inhoudCel = "";
  if (kolom.velden) {
    inhoudCel = veldenCombineren(kolom.velden, kolom.scheidingsteken, object);
  } else if (kolom.veld) {
    inhoudCel = object[kolom.veld];
  }

  if (inhoudCel) {
    return formatteerCell(inhoudCel, kolom.formatteer);
  }

  let actie = "";
  if (kolom.actie && kolom.actieEvent) {
    actie = actieKnopAanmaken(
      kolom.actie,
      kolom.actieNaam,
      kolom.actieEvent,
      object
    );
  }
  if (actie) {
    return actie;
  }
};

const veldenCombineren = (velden, scheidingsteken, object) => {
  let samengevoegdVeld = "";

  if (velden.length > 0) {
    samengevoegdVeld += object[velden[0]];
  }
  for (let index = 1; index < velden.length; index++) {
    samengevoegdVeld += scheidingsteken + object[velden[index]];
  }

  return samengevoegdVeld;
};

const actieKnopAanmaken = (actie, actieNaam, actieEvent, object) => {
  return (
    <KnopOud
      naam={actieNaam}
      clickEvent={actieEvent}
      object={object}
      functie={actie}
    />
  );
};

export default TabelInhoudCel;
