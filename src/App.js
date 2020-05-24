import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navigation/navBar";
import NotFound from "./components/notFound";
import Fabrieksinstellingen from "./components/fabrieksinstellingen/fabrieksinstellingen";
import Lijsten from "./components/lijsten/lijsten";
import FormulierAanvraagIndienen from "./components/formulieren/aanvraagIndienen";
import Inschrijvingen from "./components/lijsten/lijstItems/inschrijvingen";
import FormulierinschrijvingWijzigen from "./components/formulieren/inschrijvingWijzigen";
import FormulierInschrijvingOpzoeken from "./components/formulieren/inschrijvingOpzoeken";
import FormulierAuthenticatieStandhouder from "./components/formulieren/authenticatieStandhouder";
import FormulierAuthenticatieAdministrator from "./components/formulieren/authenticatieAdministrator";
import FormulierBetaaltransactieToevoegen from "./components/formulieren/betaaltransactieToevoegen";
import InschrijvingStatus from "./components/inschrijvingStatus";

function App() {
  return (
    <BrowserRouter>
      <div className="flexbox">
        <div className="wrapper-nav">
          <NavBar />
        </div>
        <div className="wrapper">
          <div className="inhoud">
            <Switch>
              <Route
                path="/authenticatie/standhouder"
                component={FormulierAuthenticatieStandhouder}
              />
              <Route
                path="/authenticatie/administrator"
                component={FormulierAuthenticatieAdministrator}
              />
              <Route
                path="/inschrijvingen/opzoeken"
                component={FormulierInschrijvingOpzoeken}
              />
              <Route
                path="/inschrijvingen/nieuw"
                component={FormulierAanvraagIndienen}
              />
              <Route
                path="/inschrijvingen/:inschrijvingsId/betaaltransacties/nieuw"
                component={FormulierBetaaltransactieToevoegen}
              />
              <Route
                path="/inschrijvingen/:inschrijvingsId/status"
                component={InschrijvingStatus}
              />
              <Route
                path="/inschrijvingen/:inschrijvingsId"
                component={FormulierinschrijvingWijzigen}
              />
              <Route
                path="/lijsten/inschrijvingen"
                component={Inschrijvingen}
              />
              <Route path="/lijsten/aanvragen" component={NotFound} />
              <Route path="/lijsten/" component={Lijsten} />
              <Route
                path="/fabrieksinstellingen"
                component={Fabrieksinstellingen}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/inschrijvingen/nieuw" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
