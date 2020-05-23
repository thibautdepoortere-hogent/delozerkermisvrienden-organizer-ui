import React from "react";
import TabelInhoudRij from "./tabelInhoudRij";

const TabelInhoud = ({ kolommen, rijen }) => {
  return (
    <tbody>
      {rijen.map((rij) => (
        <TabelInhoudRij key={rij.id} kolommen={kolommen} rij={rij} />
      ))}
    </tbody>
  );
};

export default TabelInhoud;
