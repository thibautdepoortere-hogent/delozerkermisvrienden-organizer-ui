import React from "react";
import Joi from "joi-browser";
import * as toaster from "../../services/toasterService";
import Formulier from "../gemeenschappelijk/formulieren/formulier";
import * as authenticatieService from "../../services/api/authenticatieService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as azureKeyVaultService from "../../services/azureKeyVaultService";

const regEx = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;
class FormulierAuthenticatieAdministrator extends Formulier {
  state = {
    errors: {},
    opdrachtNietVerwerkt: false,
    opdrachtVerwerken: false,
    data: {
      email: "",
      wachtwoord: "",
    },
  };

  schema = {
    email: Joi.string().email().max(200).required().label("E-mail"),
    wachtwoord: Joi.string().label("Wachtwoord"),
    // wachtwoord: Joi.string().regex(regEx).label("Wachtwoord"),
  };

  componentDidMount() {
    azureKeyVaultService.getSecret();
  }

  render() {
    const { opdrachtNietVerwerkt, opdrachtVerwerken } = this.state;
    return (
      <div>
        {this.genereerTitel(
          "authenticatieAdministrator",
          "Authenticatie administrator"
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

  verzendFormulier = async () => {
    this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    authenticatieService.versleutelWachtwoord(
      this.state.data.wachtwoord,
      this.onHashed
    );
  };

  onHashed = async (hash) => {
    console.log("hash: ", hash);
    const dataAuthenticatie = { ...this.state.data };
    dataAuthenticatie.wachtwoord = hash;
    const token = await this.authenticeerAdministrator(dataAuthenticatie);
    console.log("Token: ", token);
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

  // onControleUitgevoerd = async (resultaat) => {
  //   const dataAuthenticatie = { ...this.state.data };
  //   dataAuthenticatie.wachtwoord = resultaat.hashedWachtwoord;
  //   const token = await this.authenticeerAdministrator(dataAuthenticatie);
  //   console.log("Token: ", token);
  //   if (token) {
  //     this.setState({
  //       token: token,
  //       opdrachtNietVerwerkt: false,
  //       opdrachtVerwerken: false,
  //     });
  //   } else {
  //     this.setState({
  //       token: "",
  //       opdrachtNietVerwerkt: true,
  //       opdrachtVerwerken: false,
  //     });
  //   }
  // };

  // authenticeerAdministratorEmail = async () => {
  //   try {
  //     const {
  //       data: wachtwoord,
  //     } = await authenticatieService.authenticeerAdministratorEmail(
  //       this.state.data.email
  //     );
  //     return wachtwoord;
  //   } catch (error) {
  //     if (error.response.status !== 404) {
  //       responseErrorMeldingService.ToonFoutmelding(error, error);
  //     }
  //   }
  // };

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
        responseErrorMeldingService.ToonFoutmelding(error, error);
      }
    }
  };
}

export default FormulierAuthenticatieAdministrator;
