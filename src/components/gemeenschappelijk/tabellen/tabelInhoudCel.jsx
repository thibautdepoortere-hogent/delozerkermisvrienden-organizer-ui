import React from "react";
import { formatteerCell } from "../../../services/formatteerService";

const TabelInhoudCel = ({ kolom, rij }) => {
  return (
    <td
      key={rij.id + "_" + kolom.id}
      className={kolom.verbergBijSmaller ? "verbergBijSmaller" : ""}
    >
      {rij[kolom.veld]}
    </td>
  );
};

const tabelInhoudCelAanmaken = (kolom, rij) => {
  let inhoudCel = "";
  if (kolom.velden) {
    inhoudCel = veldenCombineren(kolom.velden, kolom.scheidingsteken, rij);
  } else if (kolom.veld) {
    inhoudCel = rij[kolom.veld];
  }

  if (inhoudCel) {
    return formatteerCell(inhoudCel, kolom.formatteer);
  }
};

const veldenCombineren = (velden, scheidingsteken, rij) => {
  let samengevoegdVeld = "";

  if (velden.length > 0) {
    samengevoegdVeld += rij[velden[0]];
  }
  for (let index = 1; index < velden.length; index++) {
    samengevoegdVeld += scheidingsteken + rij[velden[index]];
  }

  return samengevoegdVeld;
};

export default TabelInhoudCel;
