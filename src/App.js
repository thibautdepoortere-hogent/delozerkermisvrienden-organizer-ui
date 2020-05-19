import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navigation/navBar";
import NotFound from "./components/notFound";
import Fabrieksinstellingen from "./components/fabrieksinstellingen/fabrieksinstellingen";
import Lijsten from "./components/lijsten/lijsten";
import FormulierNieuweAanvraag from "./components/formulieren/nieuweAanvraag";
import Inschrijvingen from "./components/lijsten/lijstItems/inschrijvingen";
import FormulierAanvraagWijzigen from "./components/formulieren/aanvraagWijzigen";
import FormulierInschrijvingOpzoeken from "./components/formulieren/inschrijvingOpzoeken";

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
                path="/inschrijvingen/opzoeken"
                component={FormulierInschrijvingOpzoeken}
              />
              <Route
                path="/inschrijvingen/nieuw"
                component={FormulierNieuweAanvraag}
              />
              <Route
                path="/inschrijvingen/:id"
                component={FormulierAanvraagWijzigen}
              />
              <Route
                path="/lijsten/inschrijvingen"
                component={Inschrijvingen}
              />
              <Route path="/lijsten/aanvragen" component={NotFound} />
              <Route path="/lijsten/" component={Lijsten} />
              <Route path="/login" component={NotFound} />
              <Route path="/home" component={NotFound} />
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
