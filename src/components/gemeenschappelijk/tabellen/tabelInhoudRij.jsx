import React from "react";
import TabelInhoudCel from "./tabelInhoudCel";

const TabelInhoudRij = ({ kolommen, object }) => {
  return (
    <tr key={object.id}>
      {kolommen.map((kolom) => (
        <TabelInhoudCel key={kolom.id} kolom={kolom} object={object} />
      ))}
    </tr>
  );
};

export default TabelInhoudRij;
