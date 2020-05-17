import React from "react";
import Titel from "../gemeenschappelijk/titel";
import * as qrCodeService from "../../services/qrCodeService";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as guidService from "../../services/guidService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";

class FormulierInschrijvingOpzoeken extends Formulier {
  state = { scannerZichtbaar: false, fout: undefined, resultaat: undefined };
  render() {
    const { scannerZichtbaar, resultaat, fout } = this.state;
    return (
      <div>
        <Titel omschrijving="Inschrijving opzoeken" />
        <button onClick={this.scan}>Scannen</button>
        {scannerZichtbaar &&
          qrCodeService.genereerQrCodeLezer(this.onFout, this.onScan)}
        {fout &&
          this.genereerBelangrijkeMededeling(
            "Fout tijdens scannen:",
            fout,
            "Danger",
            "error"
          )}
        {resultaat &&
          this.genereerBelangrijkeMededeling(
            "Resultaat gevonden:",
            resultaat,
            "Success",
            "tick-circle"
          )}
      </div>
    );
  }

  scan = () => {
    this.setState({
      fout: undefined,
      resultaat: undefined,
      scannerZichtbaar: !this.state.scannerZichtbaar,
    });
  };

  onScan = (data) => {
    if (data) {
      const guid = guidService.getGuidFormaat(data);
      const isGuid = guidService.isGuid(guid);
      if (isGuid) {
        if (inschrijvingenService.bestaatInschrijving(guid)) {
          this.setState({ resultaat: data, scannerZichtbaar: false });
          this.props.history.push("/inschrijvingen/" + this.state.resultaat);
        }
      }
      this.setState({
        fout: "Geen inschrijving gevonden met waarde '" + data + "'",
        scannerZichtbaar: false,
      });
    }
  };

  onFout = (err) => {
    this.setState({ fout: err, scannerZichtbaar: false });
  };
}

export default FormulierInschrijvingOpzoeken;
