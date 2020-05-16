import React from "react";
import { Card, Elevation } from "@blueprintjs/core";

const AanvraagIngediend = (props) => {
  return (
    <Card className="card" elevation={Elevation.TWO}>
      <h1>Aanvraag ingediend</h1>
      <p>{props.match.params.id}</p>
      <p>
        Uw aanvraag is succesvol ingediend. U ontvangt een bevestigingsmail van
        uw aanvraag.
      </p>
      <p>
        <strong>
          Let wel, dit is nog geen inschrijiving, deze moet nog goedgekeurd
          worden. (u ontvang ook hiervan een mail).
        </strong>
      </p>
    </Card>
  );
};

export default AanvraagIngediend;
