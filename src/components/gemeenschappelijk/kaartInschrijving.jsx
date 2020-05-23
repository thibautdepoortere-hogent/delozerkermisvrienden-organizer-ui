import React, { Component } from "react";
import { Card } from "@blueprintjs/core";
import Knop from "./knop";
import TabelInschrijvingEigenschappen from "./tabellen/inschrijvingEigenschappen";

class KaartInschrijving extends Component {
  render() {
    const { inschrijving, detailsZichtbaar, checkInZichtbaar } = this.props;
    const detailsTonen =
      detailsZichtbaar === undefined ? true : detailsZichtbaar;
    const checkInTonen =
      checkInZichtbaar === undefined ? true : checkInZichtbaar;
    return (
      <Card key={inschrijving.id} className="card">
        <div className="card-hoofding">
          <div className="card-titel">
            <h2>{inschrijving.voornaam + " " + inschrijving.achternaam}</h2>
          </div>
          <div className="card-knoppen">
            {detailsTonen && (
              <div className="card-knop">
                <Knop
                  id={inschrijving.id + "KnopDetails"}
                  inhoud="Details"
                  intent="primary"
                  vullen={true}
                  onKlik={(e) => this.handleKlikDetails(inschrijving.id)}
                />
              </div>
            )}
            {checkInTonen && (
              <div className="card-knop">
                <Knop
                  id={inschrijving.id + "KnopCheckIn"}
                  inhoud="Check in"
                  intent="success"
                  vullen={true}
                  onKlik={(e) => this.handleKlikCheckIn(inschrijving.id)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="card-eigenschappen">
          <TabelInschrijvingEigenschappen inschrijving={inschrijving} />
        </div>
      </Card>
    );
  }

  handleKlikDetails = (inschrijvingsId) => {
    this.props.history.push("/inschrijvingen/" + inschrijvingsId);
  };

  handleKlikCheckin = (inschrijvingsId) => {
    this.props.history.push("/inschrijvingen/" + inschrijvingsId);
  };
}

export default KaartInschrijving;
