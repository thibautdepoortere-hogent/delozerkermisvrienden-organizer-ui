import React from "react";
import Joi from "joi-browser";
import Formulier from "../gemeenschappelijk/formulieren/formulier";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as authenticatieService from "../../services/api/authenticatieService";

// const regExWachtwoord = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;
class FormulierAuthenticatieAdministrator extends Formulier {
  _isMounted = false;

  state = {
    schema: this.schema,
    errors: {},
    data: {
      email: "",
      wachtwoord: "",
    },
    opdrachtNietVerwerkt: false,
    opdrachtVerwerken: false,
  };

  schema = {
    email: Joi.string().email().max(200).required().label("E-mail"),
    wachtwoord: Joi.string().label("Wachtwoord"),
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({ schema: this.schema });
    //
    const data = {
      email: "thibaut.depoortere@student.hogent.be",
      wachtwoord: "Rul3r of this region!",
    };
    this._isMounted && this.setState({ data: data });
    //
  }

  componentWillMount() {
    this._isMounted = false;
  }

  render() {
    const { opdrachtNietVerwerkt, opdrachtVerwerken } = this.state;
    return (
      <div>
        {this.genereerTitel(
          "authenticatieAdministratorH1",
          "Authenticatie administrator",
          1
        )}
        <form onSubmit={this.handleVerzendFormulier}>
          <div>
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
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "wachtwoord",
                "Wachtwoord",
                "",
                "",
                "key",
                false,
                true
              ),
            ])}
            {this.genereerVerzendKnopMetAttributen(
              opdrachtNietVerwerkt,
              opdrachtVerwerken,
              "Authenticeer",
              "Authenticatie niet mogelijk",
              "Er is geen combinatie voor deze email en wachtwoord gevonden."
            )}
          </div>
        </form>
      </div>
    );
  }

  // === === === === ===
  // Inladen / Acties
  authenticeerAdministratorEmail = async () => {
    try {
      const {
        data: wachtwoord,
      } = await authenticatieService.authenticeerAdministratorEmail(
        this.state.data.email
      );
      if (wachtwoord) {
        return wachtwoord.wachtwoord;
      }
    } catch (error) {
      if (error.response.status !== 404) {
        responseErrorMeldingService.ToonFoutmeldingVast();
      }
    }
  };

  authenticeerAdministrator = async (dataAuthenticatie) => {
    try {
      const {
        data: token,
      } = await authenticatieService.authenticeerAdministrator(
        dataAuthenticatie
      );
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
    const { wachtwoord } = this.state.data;
    this._isMounted &&
      this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const wachtwoordServer = await this.authenticeerAdministratorEmail();
    authenticatieService.controleerWachtwoord(
      wachtwoord,
      wachtwoordServer,
      this.handleControleUitgevoerd
    );
  };

  handleControleUitgevoerd = async (resultaat) => {
    const dataAuthenticatie = { ...this.state.data };
    dataAuthenticatie.wachtwoord = resultaat.hashedWachtwoord;
    const resultaatToken = await this.authenticeerAdministrator(
      dataAuthenticatie
    );
    if (authenticatieService.handleTokenOpgehaald(resultaatToken)) {
      window.location = "/lijsten";
    } else {
      this._isMounted &&
        this.setState({
          opdrachtNietVerwerkt: true,
          opdrachtVerwerken: false,
        });
    }
  };

  // === === === === ===
  // Helpers
}

export default FormulierAuthenticatieAdministrator;
