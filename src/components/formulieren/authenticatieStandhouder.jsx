import React from "react";
import Joi from "joi-browser";
import * as toaster from "../../services/toasterService";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import * as authenticatieService from "../../services/api/authenticatieService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";

class FormulierAuthenticatieStandhouder extends Formulier {
  state = {
    errors: {},
    opdrachtNietVerwerkt: false,
    opdrachtVerwerken: false,
    data: {
      inschrijvingsId: "",
      email: "",
    },
  };

  schema = {
    inschrijvingsId: Joi.string()
      .max(36)
      .required()
      .label("Inschrijvingsnummer"),
    email: Joi.string().email().max(200).required().label("E-mail"),
  };

  render() {
    const { opdrachtNietVerwerkt, opdrachtVerwerken } = this.state;
    return (
      <div>
        {this.genereerTitel(
          "authenticatieStandhouder",
          "Authenticatie standhouder"
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

  verzendFormulier = async () => {
    this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const token = await this.authenticeerStandhouder();
    console.log(token);
    if (token) {
      this.setState({
        token: token,
        opdrachtNietVerwerkt: false,
        opdrachtVerwerken: false,
      });
    } else {
      this.setState({
        token: "",
        opdrachtNietVerwerkt: true,
        opdrachtVerwerken: false,
      });
    }
  };

  authenticeerStandhouder = async () => {
    try {
      const {
        data: token,
      } = await authenticatieService.authenticeerStandhouder(this.state.data);
      return token;
    } catch (error) {
      if (error.response.status !== 404) {
        responseErrorMeldingService.ToonFoutmelding(error, error);
      }
    }
  };
}

export default FormulierAuthenticatieStandhouder;
