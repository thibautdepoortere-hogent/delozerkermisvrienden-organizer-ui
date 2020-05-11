import React from "react";
import TabelInhoudRij from "./tabelInhoudRij";

const TabelInhoud = ({ kolommen, data: objecten }) => {
  return (
    <tbody>
      {objecten.map((object) => (
        <TabelInhoudRij key={object.id} kolommen={kolommen} object={object} />
      ))}
    </tbody>
  );
};

export default TabelInhoud;
