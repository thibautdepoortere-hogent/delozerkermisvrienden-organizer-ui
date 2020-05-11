import React from "react";

const TabelHoofding = ({ kolommen }) => {
  return (
    <thead>
      <tr>
        {kolommen.map((kolom) => (
          <th
            key={kolom.id}
            className={kolom.verbergBijSmaller ? "verbergBijSmaller" : ""}
          >
            {kolom.naam}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TabelHoofding;
