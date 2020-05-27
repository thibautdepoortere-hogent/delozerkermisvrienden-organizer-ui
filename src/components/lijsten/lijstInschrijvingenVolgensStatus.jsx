import React from "react";
import KaartInschrijving from "../gemeenschappelijk/kaartInschrijving";
import Basis from "../gemeenschappelijk/basis";
import * as inschrijvingsstatusService from "../../services/api/inschrijvingsstatusService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import KaartEvenement from "../gemeenschappelijk/kaartEvenement";
import ProgressBarInladenGegevens from "../gemeenschappelijk/progressBarInladenGegevens";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import Knop from "../gemeenschappelijk/knop";
import * as authenticatieService from "../../services/api/authenticatieService";

class LijstInschrijvingenVolgensStatus extends Basis {
  _isMounted = false;

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
    this._isMounted = true;
    const id = authenticatieService.getActieveGebruikersId();
    if (id === "" || id === "geenid" || id === "geengebruiker") {
      this.props.history.push("/authenticatie/administrator");
    } else if (
      !authenticatieService.heeftActieveGebruikerToegang(["Administrator"])
    ) {
      this.props.history.push("/geentoegang");
    } else {
      const filter = this.props.match.params.inschrijvingsstatusFilter;
      this._isMounted && this.setState({ filter: filter });
      this._isMounted && this.setState({ gegevensInladen: true });
      await this.inschrijvingsstatusInladen(filter);
      await this.aanvragenInladen();
      this.handleKlikSorteerOpDatum();
      this._isMounted && this.setState({ gegevensInladen: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      this._isMounted &&
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
      this._isMounted && this.setState({ aanvragen: aanvragen });
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
    this._isMounted &&
      this.setState({
        aanvragen: aanvragen,
        sorteerOpAantalMeter: true,
        sorteerOpDatum: false,
      });
  };

  handleKlikSorteerOpDatum = () => {
    const aanvragen = this.sorteer("datumInschrijving");
    this._isMounted &&
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
    if (a.aantalMeter > b.aantalMeter) {
      return -1;
    } else if (a.aantalMeter < b.aantalMeter) {
      return 1;
    } else {
      return 0;
    }
  };

  vergelijkDatumInschrijving = (a, b) => {
    if (new Date(a.datumInschrijving) < new Date(b.datumInschrijving)) {
      return -1;
    } else if (new Date(a.datumInschrijving) > new Date(b.datumInschrijving)) {
      return 1;
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
    return inschrijvingsstatusService.getInschrijvingsstatusTitelViaFilter(
      inschrijvingsstausFilter
    );
  };
}

export default LijstInschrijvingenVolgensStatus;
