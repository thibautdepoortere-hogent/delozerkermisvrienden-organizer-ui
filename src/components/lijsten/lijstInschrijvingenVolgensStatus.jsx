import React, { Component } from "react";
import KaartInschrijving from "../gemeenschappelijk/kaartInschrijving";
import Basis from "../gemeenschappelijk/basis";
import * as inschrijvingsstatusService from "../../services/api/inschrijvingsstatusService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import KaartEvenement from "../gemeenschappelijk/kaartEvenement";
import ProgressBarInladenGegevens from "../gemeenschappelijk/progressBarInladenGegevens";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import Knop from "../gemeenschappelijk/knop";

class LijstInschrijvingenVolgensStatus extends Basis {
  state = {
    evenement: {
      id: "c4660a63-7e82-4e68-92c9-85f3c193f69e",
      naam: "Rommelmarkt 2020",
      datumStartEvenement: new Date("09/26/2020"),
    },
    aanvragen: [],
    inschrijvingsstatusId: {},
    sorteerOpAantalMeter: false,
    sorteerOpDatum: false,
    gegevensInladen: false,
    filter: "",
  };

  async componentDidMount() {
    const filter = this.props.match.params.inschrijvingsstatusFilter;
    this.setState({ filter: filter });
    this.setState({ gegevensInladen: true });
    await this.inschrijvingsstatusInladen(filter);
    await this.aanvragenInladen();
    this.handleKlikSorteerOpDatum();
    this.setState({ gegevensInladen: false });
  }

  render() {
    const { aanvragen } = this.state;
    return (
      <div>
        {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
        {this.genereerTitel(
          "aanvragenH1",
          this.titelAanmaken(this.state.filter),
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
        {aanvragen &&
          aanvragen.length > 0 &&
          aanvragen.map((aanvraag) => (
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
  inschrijvingsstatusInladen = async (filter) => {
    try {
      const {
        data: inschrijvingsstatus,
      } = await inschrijvingsstatusService.getInschrijvingsstatusViaFilter(
        filter
      );
      this.setState({ inschrijvingsstatusId: inschrijvingsstatus.id });
      return true;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return false;
    }
  };

  aanvragenInladen = async () => {
    try {
      const {
        data: aanvragen,
      } = await inschrijvingenService.getInschrijvingenViaFilters({
        inschrijvingsstatus: this.state.inschrijvingsstatusId,
      });
      this.setState({ aanvragen: aanvragen });
      return true;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return false;
    }
  };

  // === === === === ===
  // Events
  handleKlikSorteerOpAantalMeter = () => {
    const aanvragen = this.sorteer("aantalMeter");
    this.setState({
      aanvragen: aanvragen,
      sorteerOpAantalMeter: true,
      sorteerOpDatum: false,
    });
  };

  handleKlikSorteerOpDatum = () => {
    const aanvragen = this.sorteer("datumInschrijving");
    this.setState({
      aanvragen: aanvragen,
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
    const aanvragen = [...this.state.aanvragen];
    switch (sorteerMethode) {
      case "aantalMeter":
      default:
        return aanvragen.sort(this.vergelijkAantalMeter);
      case "datumInschrijving":
        return aanvragen.sort(this.vergelijkDatumInschrijving);
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
    const aanvragen = this.state.aanvragen;
    let aantalMeter = 0;
    for (let index = 0; index < aanvragen.length; index++) {
      const aanvraag = aanvragen[index];
      aantalMeter += aanvraag.aantalMeter;
    }

    return aantalMeter;
  };

  titelAanmaken = (inschrijvingsstausFilter) => {
    switch (inschrijvingsstausFilter) {
      case "aangevraagd":
        return "Openstaande aanvragen";
      case "goedgekeurd":
        return "Goedgekeurde inschrijvingen";
      case "afgekeurd":
        return "Afgekeurde inschrijvingen";
      case "gepland":
        return "Ingeplande inschrijvingen";
      case "":
      default:
        return "Alle inschrijvingen";
    }
  };
}

export default LijstInschrijvingenVolgensStatus;
