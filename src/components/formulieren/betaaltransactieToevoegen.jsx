import React from "react";
import Joi from "joi-browser";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import ProgressBarInladenGegevens from "../gemeenschappelijk/progressBarInladenGegevens";
import KaartInschrijving from "../gemeenschappelijk/kaartInschrijving";
import * as toaster from "../../services/toasterService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as betaalmethodenService from "../../services/api/betaalmethodenService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as betaaltransactiesService from "../../services/api/betaaltransactiesService";
import * as authenticatieService from "../../services/api/authenticatieService";

const regEx = /^(?=.*[0-9]).{12,12}$/;
class FormulierBetaaltransactieToevoegen extends Formulier {
  _isMounted = false;

  state = {
    schema: this.schema,
    errors: {},
    data: {
      betaalmethodeId: "",
      bedrag: 0,
      verantwoordelijkeBetaling: "",
      gestructureerdeMededeling: "",
      datumBetaling: new Date(),
      inschrijvingsId: "",
      geldReedsInKas: false,
    },
    inschrijving: {},
    betaalmethoden: [],
    betaalmethodeOverschrijving: {},
    gegevensInladen: false,
    opdrachtNietVerwerkt: false,
    opdrachtVerwerken: false,
  };

  schema = {
    betaalmethodeId: Joi.string().guid().required().label("Betaalmethode"),
    bedrag: Joi.number().min(0.01).required().label("Bedrag"),
    verantwoordelijkeBetaling: Joi.string()
      .required()
      .label("Verantwoordelijke betaling"),
    datumBetaling: Joi.date().required().label("Datum betaling"),
    inschrijvingsId: Joi.string().guid().required().label("Inschrijving"),
    geldReedsInKas: Joi.boolean().required().label("Geld reeds in kas"),
    gestructureerdeMededeling: Joi.string()
      .allow(null)
      .allow("")
      .label("Gestructureerde mededeling"),
  };

  schemaMetOverschrijving = {
    betaalmethodeId: Joi.string().guid().required().label("Betaalmethode"),
    bedrag: Joi.number().min(0.01).required().label("Bedrag"),
    verantwoordelijkeBetaling: Joi.string()
      .required()
      .label("Verantwoordelijke betaling"),
    datumBetaling: Joi.date().required().label("Datum betaling"),
    inschrijvingsId: Joi.string().guid().required().label("Inschrijving"),
    geldReedsInKas: Joi.boolean().required().label("Geld reeds in kas"),
    gestructureerdeMededeling: Joi.string()
      .regex(regEx)
      .required()
      .label("Gestructureerde mededeling"),
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
      this._isMounted &&
        this.setState({ gegevensInladen: true, schema: this.schema });
      const inschrijvingsId = this.props.match.params.inschrijvingsId;
      if (!(await inschrijvingenService.bestaatInschrijving(inschrijvingsId))) {
        this.props.history.push("/not-found");
      } else {
        this._isMounted && this.setState({ inschrijvingsId: inschrijvingsId });
        await this.inschrijvingInladen(inschrijvingsId);
        await this.betaalmethodenInladen();
        await this.betaalmethodeOverschrijvingInladen();
        // await this.inschrijvingInladen(this.state.inschrijvingsId);
        this.wijzigSchemaManueel();
        this._isMounted && this.setState({ gegevensInladen: false });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { opdrachtNietVerwerkt, opdrachtVerwerken } = this.state;
    return (
      <div>
        {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
        {this.state.inschrijving && (
          <div className="margin-rechts">
            <KaartInschrijving
              inschrijving={this.state.inschrijving}
              {...this.props}
            />
          </div>
        )}
        <form onSubmit={this.handleVerzendFormulier}>
          {this.genereerTitel("betalingH1", "Nieuwe betaaltransactie", 1)}
          <div>
            {this.genereerFormulierGroep([
              this.genereerRadio(
                "betaalmethodeId",
                "Betaalmethode",
                this.state.betaalmethoden,
                true,
                this.wijzigSchemaMetParameter
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerDatumVak(
                "datumBetaling",
                "Datum betaling",
                "",
                "",
                false,
                true,
                undefined,
                "",
                this.onFoutDatum
              ),
              this.genereerTekstvak(
                "bedrag",
                "Bedrag",
                "",
                "",
                "",
                false,
                true
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "verantwoordelijkeBetaling",
                "Verantwoordelijke betaling",
                ""
              ),
            ])}
            {this.gestructureerdeMededelingWeergeven() &&
              this.genereerFormulierGroep([
                this.genereerTekstvak(
                  "gestructureerdeMededeling",
                  "Gestructureerde mededeling",
                  "Gelieve enkel de cijfers in te vullen zonder '+++' of '/'",
                  "123123412345",
                  "",
                  false,
                  true,
                  undefined,
                  "De gestructureerde mededeling kan enkel uit cijfers bestaan en heeft een lengte van 12 cijfers."
                ),
              ])}
            {this.genereerVerzendKnopMetAttributen(
              opdrachtNietVerwerkt,
              opdrachtVerwerken,
              "Toevoegen",
              "Betaling toevoegen niet mogelijk",
              "De betaling is niet toegevoegd aan de inschrijving"
            )}
          </div>
        </form>
      </div>
    );
  }

  // === === === === ===
  // Inladen
  inschrijvingInladen = async (inschrijvingsId) => {
    try {
      const {
        data: inschrijving,
      } = await inschrijvingenService.getInschrijving(inschrijvingsId);
      const data = { ...this.state.data };
      data.inschrijvingsId = inschrijving.id;
      data.betaalmethodeId = inschrijving.betaalmethodeId;
      data.verantwoordelijkeBetaling =
        inschrijving.voornaam + " " + inschrijving.achternaam;
      data.gestructureerdeMededeling = inschrijving.gestructureerdeMededeling;
      this._isMounted &&
        this.setState({ data: data, inschrijving: inschrijving });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  betaalmethodenInladen = async () => {
    try {
      const {
        data: betaalmethoden,
      } = await betaalmethodenService.getBetaalmethoden();
      this._isMounted && this.setState({ betaalmethoden: betaalmethoden });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  betaalmethodeOverschrijvingInladen = async () => {
    try {
      const {
        data: betaalmethode,
      } = await betaalmethodenService.getBetaalmethodeOverschrijving();
      this._isMounted &&
        this.setState({ betaalmethodeOverschrijving: betaalmethode });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  // === === === === ===
  // Events
  onFoutDatum = (fouteDatum) => {
    console.log(fouteDatum);
  };

  // === === === === ===
  // Formulier verwerken
  verzendFormulier = async () => {
    this._isMounted &&
      this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const resultaat = await this.betaaltransactieToevoegen();
    if (resultaat) {
      this._isMounted && this.setState({ opdrachtVerwerken: false });
      this.props.history.push(
        "/inschrijvingen/" + this.state.data.inschrijvingsId
      );
    } else {
      this._isMounted && this.setState({ opdrachtVerwerken: false });
    }
  };

  betaaltransactieToevoegen = async () => {
    try {
      await betaaltransactiesService.postBetaaltransactie(this.state.data);
      toaster.infoToastAanmaken("Betaaltransactie toegevoegd.");
      return true;
    } catch (error) {
      this._isMounted && this.setState({ opdrachtNietVerwerkt: true });
      responseErrorMeldingService.ToonFoutmeldingVast();
      return false;
    }
  };

  // === === === === ===
  // Helpers
  wijzigSchemaMetParameter = (e) => {
    this.wijzigSchema(this.gestructureerdeMededelingWeergevenMetParameter(e));
    this.handleWijziging(e);
  };

  wijzigSchemaManueel = () => {
    this.wijzigSchema(this.gestructureerdeMededelingWeergeven());
  };

  wijzigSchema = (gestructureerdeMededelingAanwezig) => {
    if (gestructureerdeMededelingAanwezig) {
      this._isMounted &&
        this.setState({ schema: this.schemaMetOverschrijving });
    } else {
      this._isMounted && this.setState({ schema: this.schema });
    }
  };

  gestructureerdeMededelingWeergevenMetParameter = ({
    currentTarget: invoer,
  }) => {
    if (invoer.value === this.state.betaalmethodeOverschrijving.id) {
      return true;
    }
  };

  gestructureerdeMededelingWeergeven = () => {
    if (
      this.state.data.betaalmethodeId ===
      this.state.betaalmethodeOverschrijving.id
    ) {
      return true;
    }
  };
}

export default FormulierBetaaltransactieToevoegen;
