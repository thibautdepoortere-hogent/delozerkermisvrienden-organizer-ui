import React from "react";
import Titel from "../gemeenschappelijk/titel";
import * as qrCodeService from "../../services/qrCodeService";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import FormulierGroepTekstvakMetKnop from "./../gemeenschappelijk/formulieren/groepTekstvakMetKnop";
import Joi from "joi-browser";

class FormulierInschrijvingOpzoeken extends Formulier {
  state = {
    scannerZichtbaar: false,
    fout: "",
    inschrijvingen: [],
    data: { voornaam: "" },
  };

  schema = {
    voornaam: Joi.string().max(150).allow(null).allow("").label("Voornaam"),
  };

  render() {
    const { scannerZichtbaar, inschrijvingen, fout } = this.state;
    return (
      <div>
        <Titel omschrijving="Inschrijving opzoeken" />
        <FormulierGroepTekstvakMetKnop
          id="voornaam"
          omschrijving="Voornaam"
          waarde={this.state.data.voornaam}
          icoon="person"
          onInhoudGewijzigd={this.handleWijziging}
          knopOmschrijving="Zoek"
          knopIntent="primary"
          onKlik={this.handleZoekenOpvoornaam}
        />
        <div>
          <button onClick={this.scan}>Scannen</button>
        </div>
        <div>
          {scannerZichtbaar &&
            qrCodeService.genereerQrCodeLezer(
              this.handleOnFout,
              this.handleOnScan
            )}
        </div>

        {fout &&
          this.genereerBelangrijkeMededeling(
            "Fout tijdens scannen:",
            fout,
            "Danger",
            "error"
          )}
        {inschrijvingen && inschrijvingen.map((i) => <p key={i.id}>{i.id}</p>)}
      </div>
    );
  }

  scan = () => {
    this.setState({
      fout: "",
      inschrijvingen: [],
      scannerZichtbaar: !this.state.scannerZichtbaar,
    });
  };

  handleOnScan = async (data) => {
    if (data) {
      await this.inschrijvingenOphalenViaQrCode(data);
    }
  };

  handleOnFout = (err) => {
    this.setState({
      fout: err,
      inschrijvingen: [],
      scannerZichtbaar: false,
    });
  };

  handleZoekenOpvoornaam = () => {
    this.inschrijvingenOphalenViaFilters();
  };

  onVoornaamGewijzigd = (voornaam) => {
    const filters = { ...this.state.filters };
    filters.voornaam = voornaam;
    this.setState({ filters: filters });
  };

  inschrijvingenOphalenViaFilters = async () => {
    try {
      const {
        data: inschrijvingen,
      } = await inschrijvingenService.inschrijvingenViaFiltersOphalen(
        this.state.data
      );
      console.log(inschrijvingen);
      if (inschrijvingen) {
        if (inschrijvingen.length === 1) {
          this.props.history.push("/inschrijvingen/" + inschrijvingen[0].id);
        } else {
          this.setState({
            inschrijvingen: inschrijvingen,
            fout: "",
            scannerZichtbaar: false,
          });
        }
      }
    } catch (error) {
      let fout = "";
      if (error && error.response.status === 404) {
        fout = "Er zijn geen inschrijvingen gevonden met deze filters";
      } else {
        fout = "Er is een fout opgetreden bij het zoeken naar inschrijvingen.";
        responseErrorMeldingService.ToonFoutmelding(error, fout);
      }
      this.setState({
        fout: fout,
        inschrijvingen: [],
        scannerZichtbaar: false,
      });
    }
  };

  inschrijvingenOphalenViaQrCode = async (qrCode) => {
    try {
      const {
        data: inschrijvingen,
      } = await inschrijvingenService.inschrijvingenViaQrCodeOphalen(qrCode);
      if (inschrijvingen) {
        if (inschrijvingen.length === 1) {
          this.props.history.push("/inschrijvingen/" + inschrijvingen[0].id);
        } else {
          this.setState({
            inschrijvingen: inschrijvingen,
            fout:
              "Er zijn geen inschrijvingen gevonden met de QR-code '" +
              qrCode +
              "'",
            scannerZichtbaar: false,
          });
        }
      }
    } catch (error) {
      let fout = "";
      if (error && error.response.status === 404) {
        fout =
          "Er zijn geen inschrijvingen gevonden met de QR-code '" +
          qrCode +
          "'";
      } else {
        fout = "Er is een fout opgetreden bij het inladen van het evenement.";
        responseErrorMeldingService.ToonFoutmelding(error, fout);
      }
      this.setState({
        fout: fout,
        inschrijvingen: [],
        scannerZichtbaar: false,
      });
    }
  };
}

export default FormulierInschrijvingOpzoeken;
