import React, { Component } from "react";
import KaartInschrijving from "./../gemeenschappelijk/kaartInschrijving";
import Basis from "./../gemeenschappelijk/basis";
import * as inschrijvingsstatusService from "../../services/api/inschrijvingsstatusService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import KaartEvenement from "./../gemeenschappelijk/kaartEvenement";
import ProgressBarInladenGegevens from "./../gemeenschappelijk/progressBarInladenGegevens";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import Knop from "./../gemeenschappelijk/knop";

class LijstInschrijvingen extends Basis {
  state = {
    evenement: {
      id: "c4660a63-7e82-4e68-92c9-85f3c193f69e",
      naam: "Rommelmarkt 2020",
      datumStartEvenement: new Date("09/26/2020"),
    },
    inschrijvingen: [],
    inschrijvingsstatusId: {},
    sorteerOpAantalMeter: false,
    sorteerOpDatum: false,
    gegevensInladen: false,
  };

  async componentDidMount() {
    this.setState({ gegevensInladen: true });
    await this.inschrijvingsstatusInladen();
    await this.inschrijvingenInladen();
    this.handleKlikSorteerOpDatum();
    this.setState({ gegevensInladen: false });
  }

  render() {
    const { inschrijvingen } = this.state;
    return (
      <div>
        {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
        {this.genereerTitel(
          "inschrijvingenH1",
          "Openstaande inschrijvingen",
          1,
          this.berekenAantalMeter() + " meter"
        )}
        {this.state.evenement && (
          <div className="margin-rechts">
            <KaartEvenement evenement={this.state.evenement} />
          </div>
        )}
        <div>
          {this.genereerFormulierGroep([
            <Knop
              id="nieuweAanvraag"
              inhoud="Nieuwe aanvraag"
              vullen={true}
              intent="success"
              onKlik={this.handleKlikNieuweAanvraag}
            />,
          ])}
          {this.genereerFormulierGroep([
            <Knop
              id="sorteerOpDatum"
              inhoud="Sorteer op datum"
              vullen={true}
              intent={this.state.sorteerOpDatum ? "primary" : ""}
              onKlik={this.handleKlikSorteerOpDatum}
            />,
            <Knop
              id="sorteerOpAantalMeter"
              inhoud="Sorteer op aantal meter"
              vullen={true}
              intent={this.state.sorteerOpAantalMeter ? "primary" : ""}
              onKlik={this.handleKlikSorteerOpAantalMeter}
            />,
          ])}
        </div>
        {inschrijvingen &&
          inschrijvingen.length > 0 &&
          inschrijvingen.map((aanvraag) => (
            <div key={aanvraag.id} className="margin-rechts">
              <KaartInschrijving
                inschrijving={aanvraag}
                checkInZichtbaar={false}
                onKlikDetails={this.handleOnKlikDetails}
                {...this.props}
              />
            </div>
          ))}
      </div>
    );
  }

  // === === === === ===
  // Inladen
  inschrijvingsstatusInladen = async () => {
    try {
      const {
        data: inschrijvingsstatus,
      } = await inschrijvingsstatusService.getInschrijvingsstatusAangevraagd(
        this.state.data
      );
      this.setState({ inschrijvingsstatusId: inschrijvingsstatus.id });
      return true;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return false;
    }
  };

  inschrijvingenInladen = async () => {
    try {
      const {
        data: inschrijvingen,
      } = await inschrijvingenService.getInschrijvingenViaFilters(
        this.state.inschrijvingsstatusId
      );
      this.setState({ inschrijvingen: inschrijvingen });
      return true;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return false;
    }
  };

  // === === === === ===
  // Events
  handleKlikSorteerOpAantalMeter = () => {
    const inschrijvingen = this.sorteer("aantalMeter");
    this.setState({
      inschrijvingen: inschrijvingen,
      sorteerOpAantalMeter: true,
      sorteerOpDatum: false,
    });
  };

  handleKlikSorteerOpDatum = () => {
    const inschrijvingen = this.sorteer("datumInschrijving");
    this.setState({
      inschrijvingen: inschrijvingen,
      sorteerOpAantalMeter: false,
      sorteerOpDatum: true,
    });
  };

  handleKlikNieuweAanvraag = () => {
    this.props.history.push("/inschrijvingen/nieuw");
  };

  handleOnKlikDetails = (inschrijvingsId) => {
    this.props.history.push("/inschrijvingen/" + inschrijvingsId);
  };

  // === === === === ===
  // Helpers
  sorteer = (sorteerMethode) => {
    const inschrijvingen = [...this.state.inschrijvingen];
    switch (sorteerMethode) {
      case "aantalMeter":
      default:
        return inschrijvingen.sort(this.vergelijkAantalMeter);
      case "datumInschrijving":
        return inschrijvingen.sort(this.vergelijkDatumInschrijving);
    }
  };

  vergelijkAantalMeter = (a, b) => {
    // a should come before b in the sorted order
    if (a.aantalMeter > b.aantalMeter) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.aantalMeter < b.aantalMeter) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  };

  vergelijkDatumInschrijving = (a, b) => {
    // a should come before b in the sorted order
    if (new Date(a.datumInschrijving) < new Date(b.datumInschrijving)) {
      return -1;
      // a should come after b in the sorted order
    } else if (new Date(a.datumInschrijving) > new Date(b.datumInschrijving)) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  };

  berekenAantalMeter = () => {
    const inschrijvingen = this.state.inschrijvingen;
    let aantalMeter = 0;
    for (let index = 0; index < inschrijvingen.length; index++) {
      const aanvraag = inschrijvingen[index];
      aantalMeter += aanvraag.aantalMeter;
    }

    return aantalMeter;
  };
}

export default LijstInschrijvingen;
