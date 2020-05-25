import React from "react";
import Joi from "joi-browser";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import Knop from "./../gemeenschappelijk/knop";
import KaartInschrijving from "../gemeenschappelijk/kaartInschrijving";
import ProgressBarInladenGegevens from "./../gemeenschappelijk/progressBarInladenGegevens";
import * as qrCodeService from "../../services/qrCodeService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";

class FormulierInschrijvingOpzoeken extends Formulier {
  state = {
    schema: this.schema,
    errors: {},
    data: {
      voornaam: "",
      achternaam: "",
      standnummer: "",
      inschrijvingsnummer: "",
    },
    scannerZichtbaar: false,
    fout: "",
    inschrijvingen: [],
    gegevensInladen: false,
  };

  schema = {
    voornaam: Joi.string().max(150).allow(null).allow("").label("Voornaam"),
    achternaam: Joi.string().max(150).allow(null).allow("").label("Achternaam"),
    standnummer: Joi.string()
      .max(10)
      .allow(null)
      .allow("")
      .label("Standnummer"),
    inschrijvingsnummer: Joi.string()
      .max(36)
      .allow(null)
      .allow("")
      .label("Inschrijvingsnummer"),
  };

  componentDidMount() {
    this.setState({ schema: this.schema });
  }

  render() {
    const { scannerZichtbaar, inschrijvingen, fout } = this.state;
    return (
      <div>
        {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
        <div>
          {!scannerZichtbaar && (
            <div>
              {this.genereerTitel(
                "inschrijvingOpzoekenH1",
                "Inschrijving opzoeken",
                1
              )}
              {this.genereerFormulierGroep([
                this.genereerTekstvak("voornaam", "Voornaam", "", "", "person"),
                this.genereerTekstvak(
                  "achternaam",
                  "Achternaam",
                  "",
                  "",
                  "person"
                ),
              ])}
              {this.genereerFormulierGroep([
                this.genereerTekstvak(
                  "standnummer",
                  "Standnummer",
                  "",
                  "",
                  "numbered-list"
                ),
                this.genereerTekstvak(
                  "inschrijvingsnummer",
                  "Inschrijvingsnummer",
                  "",
                  "aaf9ed6c-e52b-4838-b241-431d9d7d547a",
                  "tag"
                ),
              ])}
            </div>
          )}
          {this.genereerFormulierGroep([
            <Knop
              id="zoeken"
              inhoud="Zoeken"
              intent="success"
              vullen={true}
              onKlik={this.handleKlikZoeken}
            />,
            <Knop
              id="filtersWissen"
              inhoud="Filters wissen"
              intent="danger"
              vullen={true}
              onKlik={this.handleKlikFiltersWissen}
            />,
            <Knop
              id="scanQr"
              inhoud={scannerZichtbaar ? "Verberg QR" : "Scan QR"}
              intent="primary"
              vullen={true}
              onKlik={this.handleKlikScanQrCode}
            />,
          ])}
          {fout &&
            this.genereerFormulierGroep([
              this.genereerMededeling(
                "foutTijdensZoeken",
                "Fout tijdens zoeken:",
                fout,
                "error",
                "Danger"
              ),
            ])}
        </div>
        {scannerZichtbaar && (
          <div className="qrCode-scanner">
            {qrCodeService.genereerQrCodeLezer(
              this.handleQrCodeFout,
              this.handleQrCodeGescand
            )}
          </div>
        )}
        <div className="margin-rechts">
          {!scannerZichtbaar &&
            inschrijvingen &&
            inschrijvingen.map((i) => (
              <KaartInschrijving key={i.id} inschrijving={i} {...this.props} />
            ))}
        </div>
      </div>
    );
  }

  // === === === === ===
  // Inladen
  inschrijvingenInladenViaFilters = async () => {
    try {
      this.setState({ gegevensInladen: true });
      const {
        data: inschrijvingen,
      } = await inschrijvingenService.getInschrijvingenViaFilters(
        this.state.data
      );
      this.setState({ gegevensInladen: false });
      return inschrijvingen;
    } catch (error) {
      this.setState({ gegevensInladen: false });
      responseErrorMeldingService.ToonFoutmeldingVast();
      return undefined;
    }
  };

  inschrijvingenInladenViaQrCode = async (qrCode) => {
    try {
      const {
        data: inschrijvingen,
      } = await inschrijvingenService.getInschrijvingenViaQrCode(qrCode);
      return inschrijvingen;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return undefined;
    }
  };

  // === === === === ===
  // Events
  handleKlikFiltersWissen = () => {
    this.setState({
      data: {
        voornaam: "",
        achternaam: "",
        standnummer: "",
        inschrijvingsnummer: "",
      },
      fout: "",
      inschrijvingen: [],
      scannerZichtbaar: false,
    });
  };

  handleKlikScanQrCode = () => {
    this.setState({
      fout: "",
      inschrijvingen: [],
      scannerZichtbaar: !this.state.scannerZichtbaar,
    });
  };

  handleKlikZoeken = async () => {
    const inschrijvingen = await this.inschrijvingenInladenViaFilters();
    if (inschrijvingen && inschrijvingen.length > 0) {
      this.setState({
        inschrijvingen: inschrijvingen,
        fout: "",
        scannerZichtbaar: false,
      });
    } else {
      this.setState({
        inschrijving: [],
        fout: "Er zijn geen inschrijvingen gevonden",
        scannerZichtbaar: false,
      });
    }
  };

  handleQrCodeGescand = async (data) => {
    if (data) {
      const inschrijvingen = await this.inschrijvingenInladenViaQrCode(data);
      if (inschrijvingen && inschrijvingen.length > 0) {
        this.setState({
          inschrijvingen: inschrijvingen,
          fout: "",
          scannerZichtbaar: false,
        });
      } else {
        this.setState({
          inschrijving: [],
          fout: "Er zijn geen inschrijvingen gevonden",
          scannerZichtbaar: false,
        });
      }
    }
  };

  handleQrCodeFout = (err) => {
    this.setState({
      fout: err,
      inschrijvingen: [],
      scannerZichtbaar: false,
    });
  };

  // === === === === ===
  // Helpers
}

export default FormulierInschrijvingOpzoeken;
