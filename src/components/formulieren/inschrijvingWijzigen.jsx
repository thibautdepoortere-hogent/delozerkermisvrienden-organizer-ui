import React from "react";
import Joi from "joi-browser";
import * as toaster from "../../services/toasterService";
import Formulier from "../gemeenschappelijk/formulieren/formulier";
import * as betaalmethodenService from "../../services/api/betaalmethodenService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as evenementenService from "../../services/api/evenementenService";
import * as betaaltransactiesService from "../../services/api/betaaltransactiesService";
import * as instellingenService from "../../services/api/instellingenService";
import * as qrCodeService from "../../services/qrCodeService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as datumService from "../../services/datumService";
import * as guidService from "../../services/guidService";
import Titel from "../gemeenschappelijk/titel";
import * as inschrijvingsstatusService from "../../services/api/inschrijvingsstatusService";
import * as formatteerService from "../../services/formatteerService";

class FormulierinschrijvingWijzigen extends Formulier {
  state = {
    inschrijvingsId: "",
    errors: {},
    evenement: {
      id: "",
      naam: "",
      datumStartEvenement: undefined,
    },
    inschrijvingsstatussen: [],
    betaalmethoden: [],
    betaaltransacties: [],
    data: {
      id: "",
      voornaam: "",
      achternaam: "",
      postcode: "",
      gemeente: "",
      prefixMobielNummer: "",
      mobielNummer: "",
      email: "",
      aantalMeter: 0,
      meterPrijs: 0,
      aantalWagens: 0,
      aantalAanhangwagens: 0,
      aantalMobilhomes: 0,
      opmerking: "",
      standnummer: "",
      betaalmethodeId: "",
      gestructureerdeMededeling: "",
      qrCode: "",
      redenAfkeuring: "",
      inschrijvingsstatusId: "",
      evenementId: "",
      lidId: "",
      datumInschrijving: "",
    },
    openstaandBedrag: 0,
    minimumAantalMeter: 0,
    prijs: 0,
    opdrachtVerwerken: false,
    opdrachtNietVerwerkt: false,
    schema: this.schema,
  };

  schema = {
    id: Joi.string().guid().required().label("Id"),
    voornaam: Joi.string().max(150).required().label("Voornaam"),
    achternaam: Joi.string().max(150).required().label("Achternaam"),
    postcode: Joi.string().min(4).max(4).required().label("Postcode"),
    gemeente: Joi.string().max(100).required().label("Gemeente"),
    prefixMobielNummer: Joi.string().max(6).required().label("Landnummer"),
    mobielNummer: Joi.string().min(9).max(9).required().label("Mobiel nummer"),
    email: Joi.string().email().max(200).required().label("E-mail"),
    aantalMeter: Joi.number()
      .min(this.state.minimumAantalMeter)
      .required()
      .label("Aantal meter"),
    meterPrijs: Joi.number().required().label("Meterprijs"),
    aantalWagens: Joi.number().min(0).allow(null).label("Aantal wagens"),
    aantalAanhangwagens: Joi.number()
      .min(0)
      .allow(null)
      .label("Aantal aanhangwagens"),
    aantalMobilhomes: Joi.number()
      .min(0)
      .allow(null)
      .label("Aantal mobilhomes"),
    opmerking: Joi.string().max(200).allow(null).allow("").label("Opmerking"),
    inschrijvingsstatusId: Joi.string()
      .guid()
      .required()
      .label("Inschrijvingsstatus"),
    betaalmethodeId: Joi.string().guid().required().label("Betaalmethode"),
    evenementId: Joi.string().guid().required().label("Evenement"),
    lidId: Joi.string().guid().allow(null).allow("").label("Lid"),
    datumInschrijving: Joi.date().label("Datum inschrijving"),
    gestructureerdeMededeling: Joi.string()
      .allow(null)
      .allow("")
      .label("Gestructureerde mededeling"),
    qrCode: Joi.string().allow(null).allow("").label("QR Code"),
    redenAfkeuring: Joi.string()
      .allow(null)
      .allow("")
      .label("Reden afekeuring"),
    standnummer: Joi.string()
      .max(10)
      .allow(null)
      .allow("")
      .label("Standnummer"),
  };

  async componentDidMount() {
    this.setState({ schema: this.schema });
    const inschrijvingsId = this.props.match.params.inschrijvingsId;
    const guid = guidService.getGuidFormaat(inschrijvingsId);
    if (!(await inschrijvingenService.bestaatInschrijving(guid))) {
      this.props.history.push("/not-found");
    } else {
      this.setState({ inschrijvingsId: guid });
      await this.instellingenInladen();
      await this.inschrijvingInladen(this.state.inschrijvingsId);
      await this.evenementInladen(this.state.data.evenementId);
      await this.betaalmethodenInladen();
      await this.betaalTransactiesInladen(this.state.inschrijvingsId);
      await this.inschrijvingsStatussenInladen();
    }
  }

  render() {
    const {
      evenement,
      minimumAantalMeter,
      prijs,
      opdrachtVerwerken,
      opdrachtNietVerwerkt,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleVerzendFormulier}>
          {this.genereerTitel(
            "inschrijvingAanpassen",
            "Inschrijving aanpassen",
            this.state.inschrijvingsId,
            [
              {
                id: "betalingToevoegenH1",
                inhoud: "Betaling toevoegen",
                intent: "primary",
                onKlik: this.onKlikNieuweBetaling,
              },
              {
                id: "IncheckenH1",
                inhoud: "Inchecken",
                intent: "primary",
                onKlik: this.onKlikNieuweBetaling,
              },
            ]
          )}
          {evenement &&
            evenement.datumStartEvenement &&
            this.genereerMededeling(
              "evenementDatum",
              evenement.naam,
              "Dit evenement vindt plaats op " +
                datumService.getDatumBelgischeNotatie(
                  evenement.datumStartEvenement
                ) +
                ".",
              "timeline-events",
              "Success"
            )}
          <div>
            <h2>Persoonlijk:</h2>
            {this.state.inschrijvingsId &&
              this.state.data.datumInschrijving &&
              this.genereerMededeling(
                "inschrijvingsDatum",
                "",
                "Deze inschrijving werd ingediend op " +
                  datumService.getDatumBelgischeNotatie(
                    new Date(this.state.data.datumInschrijving)
                  ) +
                  ".",
                "info-sign",
                "Primary"
              )}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "voornaam",
                "Voornaam",
                "",
                "",
                "person",
                false,
                true
              ),
              this.genereerTekstvak(
                "achternaam",
                "Achternaam",
                "",
                "",
                "person",
                false,
                true
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "postcode",
                "Postcode",
                "",
                "",
                "home",
                false,
                true
              ),
              this.genereerTekstvak(
                "gemeente",
                "Gemeente",
                "",
                "",
                "home",
                false,
                true
              ),
            ])}
            {this.genereerMobielNummer(
              "prefixMobielNummer",
              "mobielNummer",
              "",
              false,
              true
            )}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "email",
                "E-mail",
                "",
                "",
                "envelope",
                false,
                true
              ),
            ])}
          </div>
          <div>
            <h2>Praktisch:</h2>
            {this.genereerFormulierGroep([
              this.genereerNumeriekVak(
                "aantalMeter",
                "Aantal meter",
                "",
                "",
                minimumAantalMeter,
                undefined,
                false,
                true,
                undefined,
                this.handleWijzigingAantalMeter
              ),
              this.genereerNumeriekVak(
                "prijs",
                "Prijs (€)",
                "",
                "",
                undefined,
                undefined,
                true,
                false,
                prijs
              ),
            ])}
            {this.genereerMededeling(
              "minimumAanTeKopenHoeveelheid",
              "",
              "Minimum aan te kopen hoeveelheid (lopende meter):  " +
                minimumAantalMeter,
              "info-sign",
              "Primary"
            )}
            {this.genereerFormulierGroep([
              this.genereerNumeriekVak(
                "aantalWagens",
                "Aantal wagens",
                "",
                "",
                0
              ),
              this.genereerNumeriekVak(
                "aantalAanhangwagens",
                "Aantal aanhangwagens",
                "",
                "",
                0
              ),
              this.genereerNumeriekVak(
                "aantalMobilhomes",
                "Aantal mobilhomes",
                "",
                "",
                0
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstveld("opmerking", "Opmerking"),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak("standnummer", "Standnummer"),
            ])}
          </div>
          <div>
            <h2>Status:</h2>
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "inschrijvingsstatusId",
                "Inschrijvingsstatus",
                "",
                "",
                "",
                true,
                true,
                this.getOmschrijvingInschrijvingsstatus()
              ),
            ])}
            {this.state.data.redenAfkeuring &&
              this.genereerFormulierGroep([
                this.genereerTekstvak(
                  "redenAfkeuring",
                  "Reden afkeuring",
                  "",
                  "",
                  "",
                  true,
                  false
                ),
              ])}
            <h2>Betaalmethode:</h2>
            {this.genereerFormulierGroep([
              this.genereerRadio(
                "betaalmethodeId",
                "Betaalmethode",
                this.state.betaalmethoden,
                true
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "gestructureerdeMededeling",
                "Gestructureerde mededeling",
                "",
                "",
                "",
                true,
                false,
                this.state.data.gestructureerdeMededeling
                  ? formatteerService.getGeformateerdeGestructureerdeMededeling(
                      this.state.data.gestructureerdeMededeling
                    )
                  : ""
              ),
            ])}
            {this.genereerTitel(
              "betalingen",
              "Betalingen:",
              "",
              [
                {
                  id: "betalingToevoegen",
                  inhoud: "Nieuw",
                  intent: "success",
                  onKlik: this.onKlikNieuweBetaling,
                },
              ],
              2
            )}
            {this.genereerMededeling(
              "openstaandBedrag",
              this.state.openstaandBedrag >= 0
                ? "Openstaand bedrag"
                : "Terug te storten bedrag",
              "€ " + Math.abs(this.state.openstaandBedrag),
              this.state.openstaandBedrag > 0 ? "Warning" : "Success"
            )}
            <h2>Check-ins:</h2>
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "qrCode",
                "QR Code",
                "",
                "",
                "",
                true,
                false
              ),
            ])}
            {this.state.data.qrCode && (
              <div className="qrCode">
                {qrCodeService.genereerQrCode(this.state.data.qrCode)}
              </div>
            )}
          </div>
          {this.genereerVerzendKnopMetAttributen(
            opdrachtNietVerwerkt,
            opdrachtVerwerken,
            "Opslaan",
            "Fout opgetreden",
            "De aanpassingen zijn niet opgeslagen."
          )}
        </form>
      </div>
    );
  }

  // bestaatInschrijvingsId = async (id) => {
  //   const guid = guidService.getGuidFormaat(id);
  //   if (guidService.isGuid(guid)) {
  //     if (inschrijvingenService.bestaatInschrijving(guid)) {
  //       this.setState({ inschrijvingsId: this.props.match.params.inschrijvingsId });
  //     } else {
  //       this.props.history.push("/not-found");
  //     }
  //   } else {
  //     this.props.history.push("/not-found");
  //   }
  // };

  onKlikNieuweBetaling = () => {
    this.props.history.push(
      "/inschrijvingen/" +
        this.state.inschrijvingsId +
        "/betaaltransacties/nieuw"
    );
  };
  instellingenInladen = async () => {
    try {
      const {
        data: instellingen,
      } = await instellingenService.instellingenAanvraagOphalen();
      const minimumAantalMeter = instellingen.minimumAantalMeter;
      this.setState({
        minimumAantalMeter: minimumAantalMeter,
      });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de instellingen."
      );
    }
  };

  inschrijvingInladen = async (inschrijvingsId) => {
    try {
      const {
        data: inschrijving,
      } = await inschrijvingenService.inschrijvingOphalen(inschrijvingsId);
      const data = { ...this.state.data };
      this.objectGegevensToekkennenAanInternObject(inschrijving, data);
      const prijs = data.aantalMeter * data.meterPrijs;
      this.setState({ data: data, prijs: prijs });
    } catch (error) {
      if (error.response.status === "404") {
        this.props.history.push("/not-found");
      }
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de inschrijving."
      );
    }
  };

  evenementInladen = async (evenementId) => {
    try {
      const {
        data: opgehaaldEvenement,
      } = await evenementenService.evenementOphalen(evenementId);
      const evenement = { ...this.state.evenement };
      evenement.id = opgehaaldEvenement.id;
      evenement.naam = opgehaaldEvenement.naam;
      evenement.datumStartEvenement = new Date(
        opgehaaldEvenement.datumStartEvenement
      );
      this.setState({ evenement: evenement });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van het evenement."
      );
    }
  };

  betaalmethodenInladen = async () => {
    try {
      const {
        data: alleBetaalmethoden,
      } = await betaalmethodenService.betaalmethodenOphalen();
      const betaalmethoden = [...alleBetaalmethoden];
      const verschilInDagen = this.getVerschilInDagen();
      betaalmethoden.map(
        (b) =>
          (b.alleenLezen = !betaalmethodenService.isBetaalmethodeNogGeldig(
            b,
            verschilInDagen
          ))
      );
      this.setState({ betaalmethoden: betaalmethoden });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de betaalmethoden."
      );
    }
  };

  betaalTransactiesInladen = async (inschrijvingsId) => {
    try {
      const {
        data: betaaltransacties,
      } = await betaaltransactiesService.betaaltransactiesVanInschrijvingOphalen(
        inschrijvingsId
      );
      this.setState({ betaaltransacties: betaaltransacties });
      this.berekenOpenstaandBedrag();
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de betaaltransacties."
      );
    }
  };

  handleWijzigingAantalMeter = (waardeAlsNummer, waardeAlsTekst, invoer) => {
    this.updateData(invoer);

    const { meterPrijs } = this.state.data;
    const prijs = meterPrijs * invoer.value;
    this.setState({ prijs: prijs });
  };

  verzendFormulier = async () => {
    this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const id = await this.inschrijvingUpdaten();
    if (id) {
      this.setState({ opdrachtVerwerken: false });
      this.props.history.push("/inschrijvingen/" + id);
    } else {
      this.setState({ opdrachtVerwerken: false });
    }
  };

  inschrijvingUpdaten = async () => {
    try {
      const {
        data: response,
      } = await inschrijvingenService.inschrijvingUpdaten(this.state.data);
      toaster.infoToastAanmaken("inschrijving aangepast.");
      return response.id;
    } catch (error) {
      this.setState({ opdrachtNietVerwerkt: true });
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "De aanvraag is niet goed opgebouwd."
      );
      return undefined;
    }
  };

  objectGegevensToekkennenAanInternObject = (opgehaaldObject, internObject) => {
    Object.entries(opgehaaldObject).map(([key, value]) => {
      internObject[key] = value;
    });
  };

  getVerschilInDagen = () => {
    const beginPeriode = new Date();
    const eindePeriode = this.state.evenement.datumStartEvenement;
    return datumService.getDagenVerschilInPeriode(beginPeriode, eindePeriode);
  };

  berekenOpenstaandBedrag = () => {
    var openstaandBedrag = this.state.prijs;
    this.state.betaaltransacties.map((b) => (openstaandBedrag -= b.bedrag));
    this.setState({ openstaandBedrag: openstaandBedrag });
  };

  inschrijvingsStatussenInladen = async () => {
    try {
      const {
        data: inschrijvingsstatussen,
      } = await inschrijvingsstatusService.inschrijvingsstatussenOphalen();
      if (inschrijvingsstatussen) {
        this.setState({ inschrijvingsstatussen: inschrijvingsstatussen });
      }
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de inschrijvingsstatussen."
      );
    }
  };

  getOmschrijvingInschrijvingsstatus = () => {
    const inschrijvingsstatus = this.state.inschrijvingsstatussen.filter(
      (i) => i.id === this.state.data.inschrijvingsstatusId
    );
    if (inschrijvingsstatus && inschrijvingsstatus.length > 0) {
      return inschrijvingsstatus[0].naam;
    }
  };
}

export default FormulierinschrijvingWijzigen;
