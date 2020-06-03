import React from "react";
import { Callout } from "@blueprintjs/core";

const AanvraagIngediend = () => {
  return (
    <div id="aanvraagIngediendMededeling" className="mededeling">
      <Callout title="Uw aanvraag is ingediend" icon="flag" intent="Primary">
        {genereerInhoud()}
      </Callout>
    </div>
  );
};

const genereerInhoud = () => {
  return (
    <div>
      <p>Uw aanvraag tot inschrijving is ingediend, waarvoor dank!</p>
      <p>
        Als bevestiging ontvangt u een mail met een kopie van uw aanvraag
        (controleer ook je ongewenste e-mail).
      </p>
      <p>
        <strong>
          Opgelet: Deze mail geldt dus niet als inschrijvingsbewijs!
        </strong>
      </p>
      <p>
        U krijgt zo snel mogelijk een bericht met de melding of uw inschrijving
        al dan niet is goedgekeurd.
      </p>
    </div>
  );
};

export default AanvraagIngediend;
