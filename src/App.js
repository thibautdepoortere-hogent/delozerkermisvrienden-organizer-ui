import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navigation/navBar";
import NotFound from "./components/notFound";
import Fabrieksinstellingen from "./components/fabrieksinstellingen/fabrieksinstellingen";
import Lijsten from "./components/lijsten/lijsten";
import FormulierNieuweAanvraag from "./components/formulieren/nieuweAanvraag";

function App() {
  return (
    <BrowserRouter>
      <div className="flexbox">
        <NavBar />
        <div className="wrapper">
          <div className="inhoud">
            <Switch>
              <Route path="/inschrijvingen/opzoeken" component={NotFound} />
              <Route
                path="/inschrijvingen/nieuw"
                component={FormulierNieuweAanvraag}
              />
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
