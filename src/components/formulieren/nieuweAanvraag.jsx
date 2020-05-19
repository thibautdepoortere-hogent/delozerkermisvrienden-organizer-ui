import React from "react";
import Joi from "joi-browser";
import * as toaster from "../../services/toasterService";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as betaalmethodenService from "../../services/api/betaalmethodenService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as instellingenService from "../../services/api/instellingenService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as datumService from "../../services/datumService";

class FormulierNieuweAanvraag extends Formulier {
  state = {
    errors: {},
    evenement: {
      id: "c4660a63-7e82-4e68-92c9-85f3c193f69e",
      naam: "Rommelmarkt 2020",
      datumStartEvenement: new Date("09/26/2020"),
    },
    betaalmethoden: [],
    data: {
      voornaam: "",
      achternaam: "",
      postcode: "",
      gemeente: "",
      prefixMobielNummer: "+32",
      mobielNummer: "",
      email: "",
      aantalMeter: 0,
      meterPrijs: 0,
      aantalWagens: 0,
      aantalAanhangwagens: 0,
      aantalMobilhomes: 0,
      opmerking: "",
      betaalmethodeId: "",
      inschrijvingsstatusId: "",
      evenementId: "",
      lidId: "",
    },
    minimumAantalMeter: 0,
    prijs: 0,
    opdrachtVerwerken: false,
    opdrachtNietVerwerkt: false,
  };

  schema = {
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
    aantalWagens: Joi.number().min(0).label("Aantal wagens"),
    aantalAanhangwagens: Joi.number().min(0).label("Aantal aanhangwagens"),
    aantalMobilhomes: Joi.number().min(0).label("Aantal mobilhomes"),
    opmerking: Joi.string().max(200).allow(null).allow("").label("Opmerking"),
    inschrijvingsstatusId: Joi.string()
      .guid()
      .required()
      .label("Inschrijvingsstatus"),
    betaalmethodeId: Joi.string().guid().required().label("Betaalmethode"),
    evenementId: Joi.string().guid().required().label("Evenement"),
    lidId: Joi.string().guid().allow(null).allow("").label("Lid"),
  };

  async componentDidMount() {
    const data = { ...this.state.data };
    await this.instellingenInladen(data);
    this.evenementIdOphalen(data);
    this.setState({ data: data });
    await this.betaalmethodenInladen();
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
        <h1>Nieuwe aanvraag</h1>
        {this.genereerMededeling(
          "evenementDatum",
          evenement.naam,
          "Dit evenement vindt plaats op " +
            datumService.getDatumBelgischeNotatie(
              evenement.datumStartEvenement
            ),
          "timeline-events",
          "Success"
        )}
        <form onSubmit={this.handleVerzendFormulier}>
          <div>
            <h2>Persoonlijk:</h2>
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
              "minimumAanTeKopenHoeveleheid",
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
            {this.genereerMededeling(
              "aantalVoertuigenTijdensPlannen",
              "",
              "Bij het plannen van de standen zal er zoveel mogelijk rekening gehouden worden met de ingegeven voertuigen." +
                " Let wel, mogelijks kunnen niet àlle ingevulde voertuigen aan de stand staan.",
              "info-sign",
              "Primary"
            )}
            {this.genereerFormulierGroep([
              this.genereerTekstveld("opmerking", "Opmerking"),
            ])}
          </div>
          <div>
            <h2>Betaalmethode</h2>
            {this.genereerRadio(
              "betaalmethodeId",
              "Betaalmethode",
              this.state.betaalmethoden,
              true
            )}
          </div>
          {this.genereerVerzendKnopMetAttributen(
            opdrachtNietVerwerkt,
            opdrachtVerwerken,
            "Indienen",
            "Fout opgetreden",
            "Deze aanvraag is niet ingediend."
          )}
        </form>
      </div>
    );
  }

  instellingenInladen = async (data) => {
    try {
      const {
        data: instellingen,
      } = await instellingenService.instellingenAanvraagOphalen();
      const minimumAantalMeter = instellingen.minimumAantalMeter;
      const meterPrijs = instellingen.meterPrijs;
      const prijs = minimumAantalMeter * meterPrijs;
      data.aantalMeter = minimumAantalMeter;
      data.meterPrijs = meterPrijs;
      data.inschrijvingsstatusId = instellingen.aanvraagInschrijvingssstatus;
      this.setState({
        minimumAantalMeter: minimumAantalMeter,
        prijs: prijs,
      });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de instellingen."
      );
    }
  };

  evenementIdOphalen = (data) => {
    const { evenement } = this.state;
    data.evenementId = evenement.id;
  };

  betaalmethodenInladen = async () => {
    try {
      const {
        data: alleBetaalmethoden,
      } = await betaalmethodenService.betaalmethodenOphalen();
      const verschilInDagen = this.getVerschilInDagen();
      const teGebruikenBetaalmethoden = alleBetaalmethoden.filter((b) =>
        betaalmethodenService.isBetaalmethodeNogGeldig(b, verschilInDagen)
      );
      this.setState({ betaalmethoden: teGebruikenBetaalmethoden });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de betaalmethoden."
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
    const id = await this.aanvraagIndienen();
    if (id) {
      this.setState({ opdrachtVerwerken: false });
      this.props.history.push("/inschrijvingen/" + id);
    } else {
      this.setState({ opdrachtVerwerken: false });
    }
  };

  aanvraagIndienen = async () => {
    try {
      const { data: response } = await inschrijvingenService.aanvraagIndienen(
        this.state.data
      );
      toaster.infoToastAanmaken("Aanvraag ingediend.");
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

  getVerschilInDagen = () => {
    const beginPeriode = new Date();
    const eindePeriode = this.state.evenement.datumStartEvenement;
    return datumService.getDagenVerschilInPeriode(beginPeriode, eindePeriode);
  };
}

export default FormulierNieuweAanvraag;
