import React from "react";
import Joi from "joi-browser";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as authenticatieService from "../../services/api/authenticatieService";

class FormulierAuthenticatieStandhouder extends Formulier {
  _isMounted = false;

  state = {
    schema: this.schema,
    errors: {},
    data: {
      inschrijvingsId: "",
      email: "",
    },
    opdrachtNietVerwerkt: false,
    opdrachtVerwerken: false,
  };

  schema = {
    inschrijvingsId: Joi.string()
      .max(36)
      .required()
      .label("Inschrijvingsnummer"),
    email: Joi.string().email().max(200).required().label("E-mail"),
  };

  componentDidMount() {
    this._isMounted = true;
    const inschrijvingsnummer = this.props.match.params.inschrijvingsnummer;
    const data = { ...this.state.data };
    if (inschrijvingsnummer) {
      data.inschrijvingsId = inschrijvingsnummer;
    }
    this._isMounted && this.setState({ schema: this.schema, data: data });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { opdrachtNietVerwerkt, opdrachtVerwerken } = this.state;
    return (
      <div>
        {this.genereerTitel(
          "authenticatieStandhouderH1",
          "Authenticatie standhouder",
          1
        )}
        <form onSubmit={this.handleVerzendFormulier}>
          <div>
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "inschrijvingsId",
                "Inschrijvingsnummer",
                "Het inschrijvingsnummer is terug te vinden op de bevestigingsmail van je aanvraag tot inschrijving.",
                "aaf9ed6c-e52b-4838-b241-431d9d7d547a",
                "tag",
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
            {this.genereerVerzendKnopMetAttributen(
              opdrachtNietVerwerkt,
              opdrachtVerwerken,
              "Authenticeer",
              "Authenticatie niet mogelijk",
              "Er is geen combinatie voor dit inschrijvingsnummer en e-mail gevonden."
            )}
          </div>
        </form>
      </div>
    );
  }

  // === === === === ===
  // Inladen / Acties
  authenticeerStandhouder = async () => {
    try {
      const {
        data: token,
      } = await authenticatieService.authenticeerStandhouder(this.state.data);
      return token;
    } catch (error) {
      if (error.response.status !== 404) {
        responseErrorMeldingService.ToonFoutmeldingVast();
      }
    }
  };

  // === === === === ===
  // Events

  // === === === === ===
  // Formulier verwerken
  verzendFormulier = async () => {
    this._isMounted &&
      this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const resultaatToken = await this.authenticeerStandhouder();
    if (authenticatieService.handleTokenOpgehaald(resultaatToken)) {
      const id = authenticatieService.getActieveGebruikersId();
      window.location = "/inschrijvingen/" + id + "/status";
    } else {
      this._isMounted &&
        this.setState({
          token: "",
          opdrachtNietVerwerkt: true,
          opdrachtVerwerken: false,
        });
    }
  };

  // === === === === ===
  // Helpers
}

export default FormulierAuthenticatieStandhouder;
