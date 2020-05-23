import React from "react";
import Titel from "../gemeenschappelijk/titel";
import * as qrCodeService from "../../services/qrCodeService";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import Joi from "joi-browser";
import FormulierGroepTekstvak from "./../gemeenschappelijk/formulieren/groepTekstvak";
import Knop from "./../gemeenschappelijk/knop";
import KaartInschrijving from "../gemeenschappelijk/kaartInschrijving";

class FormulierInschrijvingOpzoeken extends Formulier {
  state = {
    errors: {},
    scannerZichtbaar: false,
    fout: "",
    inschrijvingen: [],
    data: {
      voornaam: "",
      achternaam: "",
      standnummer: "",
      inschrijvingsnummer: "",
    },
    schema: this.schema,
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
        <div>
          {!scannerZichtbaar && (
            <div>
              {this.genereerTitel(
                "inschrijvingOpzoeken",
                "Inschrijving opzoeken"
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
              onKlik={this.handleZoeken}
            />,
            <Knop
              id="filtersWissen"
              inhoud="Filters wissen"
              intent="danger"
              vullen={true}
              onKlik={this.handleFiltersWissen}
            />,
            <Knop
              id="scanQr"
              inhoud={scannerZichtbaar ? "Verberg QR" : "Scan QR"}
              intent="primary"
              vullen={true}
              onKlik={this.handleScanQr}
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
              this.handleOnFoutQr,
              this.handleOnScan
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

  handleOnScan = async (data) => {
    if (data) {
      await this.inschrijvingenOphalenViaQrCode(data);
    }
  };

  handleOnFoutQr = (err) => {
    this.setState({
      fout: err,
      inschrijvingen: [],
      scannerZichtbaar: false,
    });
  };

  handleZoeken = async () => {
    await this.inschrijvingenOphalenViaFilters();
  };

  handleFiltersWissen = () => {
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

  handleScanQr = () => {
    this.setState({
      fout: "",
      inschrijvingen: [],
      scannerZichtbaar: !this.state.scannerZichtbaar,
    });
  };

  inschrijvingenOphalenViaFilters = async () => {
    try {
      const {
        data: inschrijvingen,
      } = await inschrijvingenService.inschrijvingenViaFiltersOphalen(
        this.state.data
      );
      if (inschrijvingen) {
        if (inschrijvingen.length > 0) {
          this.setState({
            inschrijvingen: inschrijvingen,
            fout: "",
            scannerZichtbaar: false,
          });
        } else {
          this.setState({
            inschrijvingen: [],
            fout: "Er zijn geen inschrijvingen gevonden met deze filters",
            scannerZichtbaar: false,
          });
        }
      }
    } catch (error) {
      let fout = "";
      fout = "Er is een fout opgetreden bij het zoeken naar inschrijvingen.";
      responseErrorMeldingService.ToonFoutmelding(error, true, fout);
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
        if (inschrijvingen.length > 0) {
          this.setState({
            inschrijvingen: inschrijvingen,
            fout: "",
            scannerZichtbaar: false,
          });
        } else {
          this.setState({
            inschrijvingen: [],
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
        fout =
          "Er is een fout opgetreden bij het inladen van de inschrijvingen.";
        responseErrorMeldingService.ToonFoutmelding(error, true, fout);
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
