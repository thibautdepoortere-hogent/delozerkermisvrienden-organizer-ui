import React from "react";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as betaalmethodenService from "../../services/api/betaalmethodenService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as betaaltransactiesService from "../../services/api/betaaltransactiesService";
import Joi from "joi-browser";
import * as toaster from "../../services/toasterService";
import SpinnerInladenGegevens from "./../gemeenschappelijk/spinnerInladenGegevens";
import KaartInschrijving from "../gemeenschappelijk/kaartInschrijving";

const regEx = /^(?=.*[0-9]).{12,12}$/;
class FormulierBetaaltransactieToevoegen extends Formulier {
  state = {
    errors: {},
    opdrachtNietVerwerkt: false,
    opdrachtVerwerken: false,
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
    schema: this.schema,
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
    this.setState({ gegevensInladen: true, schema: this.schema });
    await this.betaalmethodenInladen();
    await this.betaalmethodeOverschrijvingInladen();
    await this.controleInschrijving();
    this.wijzigSchemaManueel();
    this.setState({ gegevensInladen: false });
  }

  render() {
    const { opdrachtNietVerwerkt, opdrachtVerwerken } = this.state;
    return (
      <div>
        {this.state.gegevensInladen && <SpinnerInladenGegevens />}

        <form onSubmit={this.handleVerzendFormulier}>
          {this.genereerTitel("betaling", "Nieuwe betaaltransactie")}
          {this.state.inschrijving && (
            <div className="margin-rechts">
              <KaartInschrijving
                inschrijving={this.state.inschrijving}
                checkInZichtbaar={false}
                {...this.props}
              />
            </div>
          )}
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

  wijzigSchemaMetParameter = (e) => {
    this.wijzigSchema(this.gestructureerdeMededelingWeergevenMetParameter(e));
    this.handleWijziging(e);
  };

  wijzigSchemaManueel = () => {
    this.wijzigSchema(this.gestructureerdeMededelingWeergeven());
  };

  wijzigSchema = (gestructureerdeMededelingAanwezig) => {
    if (gestructureerdeMededelingAanwezig) {
      this.setState({ schema: this.schemaMetOverschrijving });
    } else {
      this.setState({ schema: this.schema });
    }
  };

  onFoutDatum = (fouteDatum) => {
    console.log(fouteDatum);
  };

  verzendFormulier = async () => {
    this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const resultaat = await this.betaaltransactieToevoegen();
    if (resultaat) {
      this.setState({ opdrachtVerwerken: false });
      this.props.history.push(
        "/inschrijvingen/" + this.state.data.inschrijvingsId
      );
    } else {
      this.setState({ opdrachtVerwerken: false });
    }
  };

  betaaltransactieToevoegen = async () => {
    try {
      const {
        data: response,
      } = await betaaltransactiesService.betaaltransactieToevoegen(
        this.state.data
      );
      toaster.infoToastAanmaken("Betaaltransactie toegevoegd.");
      return true;
    } catch (error) {
      this.setState({ opdrachtNietVerwerkt: true });
      responseErrorMeldingService.ToonFoutmelding(
        error,
        true,
        "De aanvraag is niet goed opgebouwd."
      );
      return false;
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

  gestructureerdeMededelingWeergevenMetParameter = ({
    currentTarget: invoer,
  }) => {
    if (invoer.value === this.state.betaalmethodeOverschrijving.id) {
      return true;
    }
  };

  betaalmethodenInladen = async () => {
    try {
      const {
        data: alleBetaalmethoden,
      } = await betaalmethodenService.betaalmethodenOphalen();
      this.setState({ betaalmethoden: alleBetaalmethoden });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        true,
        "Er is een fout opgetreden bij het inladen van de betaalmethoden."
      );
    }
  };

  betaalmethodeOverschrijvingInladen = async () => {
    try {
      const {
        data: betaalmethode,
      } = await betaalmethodenService.betaalmethodeOverschrijving();
      this.setState({ betaalmethodeOverschrijving: betaalmethode });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        true,
        "Er is een fout opgetreden bij het inladen van de betaalmathode voor overschrijving."
      );
    }
  };

  controleInschrijving = async () => {
    const paramsInschrijvingsId = this.props.match.params.inschrijvingsId;
    if (paramsInschrijvingsId) {
      const inschrijvingsId = await inschrijvingenService.controleInschrijvingsId(
        paramsInschrijvingsId
      );
      if (inschrijvingsId) {
        const inschrijving = await this.inschrijvingInladen(inschrijvingsId);
        const data = { ...this.state.data };
        data.inschrijvingsId = inschrijvingsId;
        if (inschrijving) {
          data.betaalmethodeId = inschrijving.betaalmethodeId;
          data.verantwoordelijkeBetaling =
            inschrijving.voornaam + " " + inschrijving.achternaam;
          data.gestructureerdeMededeling =
            inschrijving.gestructureerdeMededeling;
          // var schema = "";
          // if (data.gestructureerdeMededeling) {
          //   schema = this.schemaMetOverschrijving;
          // } else {
          //   schema = this.schema;
          // }
        }
        this.setState({ data: data, inschrijving: inschrijving });
      } else {
        this.props.history.push("/not-found");
      }
    }
  };

  inschrijvingInladen = async (inschrijvingsId) => {
    try {
      const {
        data: inschrijving,
      } = await inschrijvingenService.inschrijvingOphalen(inschrijvingsId);
      return inschrijving;
    } catch (error) {
      if (error.response.status === "404") {
        this.props.history.push("/not-found");
      }
      responseErrorMeldingService.ToonFoutmelding(
        error,
        true,
        "Er is een fout opgetreden bij het inladen van de inschrijving."
      );
    }
  };
}

export default FormulierBetaaltransactieToevoegen;
