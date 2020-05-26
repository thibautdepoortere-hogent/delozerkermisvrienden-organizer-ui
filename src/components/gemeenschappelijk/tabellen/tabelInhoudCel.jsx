import React from "react";

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

export default TabelInhoudCel;
