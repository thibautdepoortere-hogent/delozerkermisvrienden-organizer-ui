import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navigation/navBar";
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
              {/* --- AUTHENTICATIE --- */}
              <Route
                path="/authenticatie/standhouder/:inschrijvingsnummer?"
                component={FormulierAuthenticatieStandhouder}
              />
              <Route
                path="/authenticatie/administrator"
                component={FormulierAuthenticatieAdministrator}
              />

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
