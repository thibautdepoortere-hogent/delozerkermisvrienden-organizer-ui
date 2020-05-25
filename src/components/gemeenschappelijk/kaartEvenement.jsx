import React from "react";
import TabelEvenementEigenschappen from "./tabellen/evenementEigenschappen";
import { Card } from "@blueprintjs/core";
import Knop from "./knop";

const KaartEvenement = ({ evenement, detailsZichtbaar }) => {
  const detailsTonen = detailsZichtbaar === undefined ? true : detailsZichtbaar;
  return (
    <Card key={evenement.id} className="card">
      <div className="card-hoofding">
        <div className="card-titel">
          <h2>{evenement.naam}</h2>
        </div>
      </div>
      <div className="card-eigenschappen">
        <TabelEvenementEigenschappen evenement={evenement} />
      </div>
    </Card>
  );
};

// === === === === ===
// Events

export default KaartEvenement;
