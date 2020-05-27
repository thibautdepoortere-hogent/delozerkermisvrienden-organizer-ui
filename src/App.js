import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import * as Sentry from "@sentry/browser";
import NavBar from "./components/navigatie/navBar";
import NotFound from "./components/notFound";
import Fabrieksinstellingen from "./components/fabrieksinstellingen/fabrieksinstellingen";
import Lijsten from "./components/lijsten/lijsten";
import FormulierAanvraagIndienen from "./components/formulieren/aanvraagIndienen";
import FormulierinschrijvingWijzigen from "./components/formulieren/inschrijvingWijzigen";
import FormulierInschrijvingOpzoeken from "./components/formulieren/inschrijvingOpzoeken";
import FormulierAuthenticatieStandhouder from "./components/formulieren/authenticatieStandhouder";
import FormulierAuthenticatieAdministrator from "./components/formulieren/authenticatieAdministrator";
import FormulierBetaaltransactieToevoegen from "./components/formulieren/betaaltransactieToevoegen";
import InschrijvingStatus from "./components/inschrijvingStatus";
import LijstInschrijvingenVolgensStatus from "./components/lijsten/lijstInschrijvingenVolgensStatus";
import LogUit from "./components/logUit";
import * as authenticatieService from "./services/api/authenticatieService";
import Uitgelogd from "./components/uitgelogd";
import CheckIn from "./components/checkIn";
import GeenToegang from "./components/geenToegang";

Sentry.init({
  dsn:
    "https://73ef6f5909ce49e5bf703799d1587317@o387121.ingest.sentry.io/5255822",
});

class App extends Component {
  state = { gebruiker: "" };

  componentDidMount() {
    const gebruiker = authenticatieService.getActieveGebruiker();
    this.setState({ gebruiker: gebruiker });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="flexbox">
          <div className="wrapper-nav">
            <NavBar gebruiker={this.state.gebruiker} />
          </div>
          <div className="wrapper">
            <div className="inhoud">
              <Switch>
                {/* --- AUTHENTICATIE --- */}
                <Route
                  path="/authenticatie/standhouder/:inschrijvingsnummer?"
                  component={FormulierAuthenticatieStandhouder}
                />
                <Route
                  path="/authenticatie/administrator"
                  component={FormulierAuthenticatieAdministrator}
                />
                <Route path="/authenticatie/loguit" component={LogUit} />

                {/* --- INSCHRIJVINGEN --- */}
                <Route
                  path="/inschrijvingen/opzoeken"
                  exact
                  component={FormulierInschrijvingOpzoeken}
                />
                <Route
                  path="/inschrijvingen/nieuw"
                  exact
                  component={FormulierAanvraagIndienen}
                />
                <Route
                  path="/inschrijvingen/:inschrijvingsId/betaaltransacties/nieuw"
                  component={FormulierBetaaltransactieToevoegen}
                />
                <Route
                  path="/inschrijvingen/:inschrijvingsId/status/:aanvraagIngediend?"
                  component={InschrijvingStatus}
                />
                <Route
                  path="/inschrijvingen/:inschrijvingsId/checkIn"
                  component={CheckIn}
                />
                <Route
                  path="/inschrijvingen/:inschrijvingsId"
                  component={FormulierinschrijvingWijzigen}
                />

                {/* --- LIJSTEN --- */}
                <Route
                  path="/lijst/inschrijvingen/:inschrijvingsstatusFilter"
                  component={LijstInschrijvingenVolgensStatus}
                />
                <Route path="/lijsten/" component={Lijsten} />

                {/* --- FABRIEKSINSTELLINGEN --- */}
                <Route
                  path="/fabrieksinstellingen"
                  component={Fabrieksinstellingen}
                />

                {/* --- OVERIGE --- */}
                <Route path="/geentoegang" component={GeenToegang} />
                <Route path="/uitgelogd" component={Uitgelogd} />
                <Route path="/not-found" exact component={NotFound} />
                <Redirect from="/" exact to="/inschrijvingen/nieuw" />
                {/* <Redirect to="/not-found" /> */}
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
