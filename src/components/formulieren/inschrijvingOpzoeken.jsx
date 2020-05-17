import React from "react";
import Titel from "../gemeenschappelijk/titel";
import * as qrCodeService from "../../services/qrCodeService";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";

class FormulierInschrijvingOpzoeken extends Formulier {
  state = {
    scannerZichtbaar: false,
    fout: "",
    inschrijvingen: [],
  };
  render() {
    const { scannerZichtbaar, inschrijvingen, fout } = this.state;
    return (
      <div>
        <Titel omschrijving="Inschrijving opzoeken" />
        <button onClick={this.scan}>Scannen</button>
        {scannerZichtbaar &&
          qrCodeService.genereerQrCodeLezer(
            this.handleOnFout,
            this.handleOnScan
          )}
        {fout &&
          this.genereerBelangrijkeMededeling(
            "Fout tijdens scannen:",
            fout,
            "Danger",
            "error"
          )}
        {inschrijvingen && inschrijvingen.map((i) => console.log(i))}
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
      await this.inschrijvingenOphalen(data);
    }
  };

  handleOnFout = (err) => {
    this.setState({
      fout: err,
      inschrijvingen: [],
      scannerZichtbaar: false,
    });
  };

  inschrijvingenOphalen = async (qrCode) => {
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
