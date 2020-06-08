import React from "react";
import Joi from "joi-browser";
import Formulier from "../gemeenschappelijk/formulieren/formulier";
import ProgressBarInladenGegevens from "./../gemeenschappelijk/progressBarInladenGegevens";
import * as datumService from "../../services/datumService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as betaalmethodenService from "../../services/api/betaalmethodenService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as instellingenService from "../../services/api/instellingenService";
import * as nieuwsbriefService from "../../services/api/nieuwsbriefService";
import * as authenticatieService from "../../services/api/authenticatieService";
import KaartEvenement from "./../gemeenschappelijk/kaartEvenement";
import { config } from "../../services/env";

class FormulierAanvraagIndienen extends Formulier {
  _isMounted = false;

  state = {
    schema: this.schema,
    errors: {},
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
    evenement: {
      id: "c4660a63-7e82-4e68-92c9-85f3c193f69e",
      naam: "Rommelmarkt 2020",
      datumStartEvenement: new Date("09/26/2020"),
    },
    betaalmethoden: [],
    nieuwsbrief: false,
    minimumAantalMeter: 0,
    prijs: 0,
    validatieOk: false,
    opdrachtVerwerken: false,
    opdrachtNietVerwerkt: false,
    gegevensInladen: false,
    overlayActief: false,
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
    this._isMounted = true;
    this._isMounted &&
      this.setState({ gegevensInladen: true, schema: this.schema });
    const rol = authenticatieService.getActieveGebruikersRol();
    const id =
      rol === "Administrator"
        ? authenticatieService.getActieveGebruikersId()
        : "";
    await this.instellingenInladen();
    this.evenementIdInladen();
    await this.betaalmethodenInladen();
    const data = { ...this.state.data };
    if (id !== "") {
      data.lidId = id;
    }
    this._isMounted &&
      this.setState({
        gegevensInladen: false,
        overlayActief: true,
        data: data,
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
        <form onSubmit={this.handleVerzendFormulier}>
          {this.genereerTitel("nieuweAanvraagH1", "Nieuwe inschrijving", 1)}
          <div className="margin-rechts">
            <KaartEvenement evenement={evenement} />
          </div>
          <div>
            {this.genereerTitel("persoonlijkH2", "Persoonlijk", 2)}
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
            {this.genereerFormulierGroep([
              this.genereerMobielNummer(
                "prefixMobielNummer",
                "mobielNummer",
                "",
                false,
                true
              ),
            ])}
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
            {this.genereerTitel("praktischH2", "Praktisch", 2)}
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
                this.verwerkWijzigingAantalMeter
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
            {this.genereerTitel("betaalmethodeH2", "Betaalmethode", 2)}
            {this.genereerRadio(
              "betaalmethodeId",
              "Betaalmethode",
              this.state.betaalmethoden,
              true
            )}
          </div>
          <div>
            {this.genereerTitel("nieuwsbriefH2", "Nieuwsbrief", 2)}
            {this.genereerCheckbox(
              "nieuwsbrief",
              "Ik wil graag op de hoogte gehouden worden van jullie toekomstige evenementen via mail.",
              "",
              false,
              undefined,
              this.verwerkWijzigingNieuwsbrief
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

  // === === === === ===
  // Inladen
  instellingenInladen = async () => {
    try {
      const data = { ...this.state.data };
      const {
        data: instellingen,
      } = await instellingenService.getInstellingenAanvraag();
      data.aantalMeter = instellingen.minimumAantalMeter;
      data.meterPrijs = instellingen.meterPrijs;
      data.inschrijvingsstatusId = instellingen.aanvraagInschrijvingssstatus;
      const prijs = data.aantalMeter * data.meterPrijs;
      this._isMounted &&
        this.setState({
          data: data,
          minimumAantalMeter: instellingen.minimumAantalMeter,
          prijs: prijs,
          schema: this.schema,
        });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  evenementIdInladen = () => {
    const data = { ...this.state.data };
    const { evenement } = this.state;
    data.evenementId = evenement.id;
    this._isMounted && this.setState({ data: data });
  };

  betaalmethodenInladen = async () => {
    try {
      const {
        data: alleBetaalmethoden,
      } = await betaalmethodenService.getBetaalmethoden();
      const verschilInDagen = this.getVerschilInDagen();
      const teGebruikenBetaalmethoden = alleBetaalmethoden.filter((b) =>
        betaalmethodenService.isBetaalmethodeNogGeldig(b, verschilInDagen)
      );
      this._isMounted &&
        this.setState({ betaalmethoden: teGebruikenBetaalmethoden });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  // === === === === ===
  // Events
  verwerkWijzigingNieuwsbrief = () => {
    this._isMounted && this.setState({ nieuwsbrief: !this.state.nieuwsbrief });
  };

  verwerkWijzigingAantalMeter = (waardeAlsNummer, waardeAlsTekst, invoer) => {
    const { meterPrijs } = this.state.data;
    const prijs = meterPrijs * invoer.value;
    this._isMounted && this.setState({ prijs: prijs });
  };

  // === === === === ===
  // Formulier verwerken
  verzendFormulier = async () => {
    this._isMounted &&
      this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    if (this.state.nieuwsbrief) {
      await this.nieuwsbriefToevoegen();
    }
    const aanvraagId = await this.aanvraagIndienen();
    if (aanvraagId !== false && aanvraagId !== undefined) {
      const rol = authenticatieService.getActieveGebruikersRol();
      if (rol === "Administrator") {
        window.location = "/lijst/inschrijvingen/aangevraagd";
      } else {
        const resultaatToken = await this.authenticeerStandhouder(
          aanvraagId,
          this.state.data.email
        );
        if (authenticatieService.handleTokenOpgehaald(resultaatToken)) {
          const id = authenticatieService.getActieveGebruikersId();
          window.location =
            "/inschrijvingen/" + id + "/status/aanvraagIngediend";
        } else {
          this.aanvraagIndienenNietVoltooid();
        }
      }
    } else {
      this.aanvraagIndienenNietVoltooid();
    }
  };

  aanvraagIndienenNietVoltooid = () => {
    this._isMounted &&
      this.setState({ opdrachtVerwerken: false, opdrachtNietVerwerkt: true });
  };

  aanvraagIndienen = async () => {
    try {
      const {
        data: ingediendeAanvraag,
      } = await inschrijvingenService.postAanvraag(this.state.data);
      //toaster.infoToastAanmaken("Aanvraag ingediend.");
      return ingediendeAanvraag ? ingediendeAanvraag.id : undefined;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return false;
    }
  };

  nieuwsbriefToevoegen = async () => {
    try {
      const nieuwsbrief = {
        email: this.state.data.email,
        evenementId: this.state.data.evenementId,
      };
      await nieuwsbriefService.postNieuwsbrief(nieuwsbrief);
    } catch (error) {}
  };

  authenticeerStandhouder = async (inschrijvingsId, email) => {
    const data = {
      inschrijvingsId: inschrijvingsId,
      email: email,
    };
    try {
      const {
        data: token,
      } = await authenticatieService.authenticeerStandhouder(data);
      return token;
    } catch (error) {
      if (error.response.status !== 404) {
        responseErrorMeldingService.ToonFoutmeldingVast();
      }
    }
  };

  // === === === === ===
  // Helpers
  getVerschilInDagen = () => {
    const beginPeriode = new Date();
    const eindePeriode = this.state.evenement.datumStartEvenement;
    return datumService.getDagenVerschilInPeriode(beginPeriode, eindePeriode);
  };
}

export default FormulierAanvraagIndienen;
