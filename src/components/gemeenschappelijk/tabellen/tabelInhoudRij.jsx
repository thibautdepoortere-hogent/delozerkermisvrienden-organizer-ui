import React from "react";
import TabelInhoudCel from "./tabelInhoudCel";

const TabelInhoudRij = ({ kolommen, rij }) => {
  return (
    <tr key={rij.id}>
      {kolommen.map((kolom) => (
        <TabelInhoudCel key={kolom.id} kolom={kolom} rij={rij} />
      ))}
    </tr>
  );
};

export default TabelInhoudRij;
