import React from "react";
import Knop from "./../gemeenschappelijk/knop";
import * as fabrieksinstellingenService from "../../services/api/fabrieksinstellingenService";
import * as authenticatieService from "../../services/api/authenticatieService";
import * as toaster from "../../services/toasterService";
import Basis from "./../gemeenschappelijk/basis";
import ProgressBarInladenGegevens from "./../gemeenschappelijk/progressBarInladenGegevens";

class Fabrieksinstellingen extends Basis {
  _isMounted = false;
  state = { gegevensInladen: false };

  componentDidMount() {
    this._isMounted = true;
    const id = authenticatieService.getActieveGebruikersId();
    if (id === "" || id === "geenid" || id === "geengebruiker") {
      this.props.history.push("/authenticatie/administrator");
    } else if (
      !authenticatieService.heeftActieveGebruikerToegang(["Administrator"])
    ) {
      this.props.history.push("/geentoegang");
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
        {this.genereerTitel("fabrieksinstellingen", "Fabrieksinstellingen", 1)}
        <div>
          <p>
            Gebruik deze functie om de standaardwaarden in de database terug in
            te laden.
          </p>
          <Knop
            id="fabrieksinstellingenKnop"
            inhoud="Terugzetten naar fabrieksinstellingen"
            intent="danger"
            onKlik={this.handleClick}
          />
        </div>
      </div>
    );
  }

  handleClick = async () => {
    this._isMounted && this.setState({ gegevensInladen: true });
    await this.fabrieksinstellingenTerugzetten();
    this._isMounted && this.setState({ gegevensInladen: false });
  };

  fabrieksinstellingenTerugzetten = async () => {
    try {
      await fabrieksinstellingenService.fabrieksinstellingenTerugzetten();
      toaster.infoToastAanmaken("Teruggezet naar fabrieksinstellingen.");
    } catch (error) {
      toaster.errorToastAanmaken(
        "Er is een onverwachte fout opgetreden bij het instellen van de fabrieksinstellingen."
      );
    }
  };
}

export default Fabrieksinstellingen;
