import React from "react";
import Joi from "joi-browser";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as authenticatieService from "../../services/api/authenticatieService";

class FormulierAuthenticatieStandhouder extends Formulier {
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
    this.setState({ schema: this.schema });
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
    this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const token = await this.authenticeerStandhouder();
    console.log(token);
    if (token) {
      this.props.history.push(
        "/inschrijvingen/" + this.state.data.inschrijvingsId + "/status"
      );
    } else {
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
