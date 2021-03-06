import React from "react";
import { Card } from "@blueprintjs/core";
import Basis from "./basis";
import Knop from "./knop";
import TabelInschrijvingEigenschappen from "./tabellen/inschrijvingEigenschappen";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as inschrijvingsstatusService from "../../services/api/inschrijvingsstatusService";

class KaartInschrijving extends Basis {
  _isMounted = false;

  state = { inschrijvingsstatus: {} };

  async componentDidMount() {
    this._isMounted = true;
    if (this.props.inschrijving && this.props.inschrijving.inschrijvingsId) {
      await this.inschrijvingsstatusInladen();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      inschrijving,
      detailsZichtbaar,
      checkInZichtbaar,
      onKlikDetails,
      onKlikCheckIn,
    } = this.props;
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
                  onKlik={(e) =>
                    onKlikDetails
                      ? onKlikDetails(inschrijving.id)
                      : this.handleKlikDetails(inschrijving.id)
                  }
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
                  onKlik={(e) =>
                    onKlikCheckIn
                      ? onKlikCheckIn(inschrijving.id)
                      : this.handleKlikCheckIn(inschrijving.id)
                  }
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

  // === === === === ===
  // Inladen
  inschrijvingsstatusInladen = async () => {
    try {
      const {
        data: inschrijvingsstatus,
      } = await inschrijvingsstatusService.getInschrijvingsstatus(
        this.props.inschrijving.inschrijvingsstatusId
      );
      this._isMounted &&
        this.setState({ inschrijvingsstatus: inschrijvingsstatus });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  // === === === === ===
  // Events
  handleKlikDetails = (inschrijvingsId) => {
    this.props.history.push("/inschrijvingen/" + inschrijvingsId);
  };

  handleKlikCheckIn = (inschrijvingsId) => {
    this.props.history.push("/inschrijvingen/" + inschrijvingsId + "/checkin");
  };
}

export default KaartInschrijving;
