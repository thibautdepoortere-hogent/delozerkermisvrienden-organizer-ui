import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBarLijsten from "./navBarLijsten";
import NotFound from "./../notFound";
import Inschrijvingen from "./lijstItems/inschrijvingen";

const Lijsten = () => {
  return (
    <React.Fragment>
      <NavBarLijsten lijsten={lijsten} />
      <Switch>
        {lijsten.map((lijst) => lijst.route)}
        {lijsten && lijsten[0] && (
          <Redirect from="/lijsten" exact to={lijsten[0].link} />
        )}
      </Switch>
    </React.Fragment>
  );
};

const lijsten = [
  {
    id: "1",
    extraClass: "bp3-intent-warning",
    omschrijving: "Aanvragen",
    link: "/lijsten/aanvragen",
    route: <Route key="1" path="/lijsten/aanvragen" component={NotFound} />,
  },
  {
    id: "2",
    extraClass: "bp3-intent-success",
    omschrijving: "Inschrijvingen",
    link: "/lijsten/inschrijvingen",
    route: (
      <Route
        key="2"
        path="/lijsten/inschrijvingen"
        render={(props) => <Inschrijvingen filter="goedgekeurd" {...props} />}
      />
    ),
  },
  {
    id: "3",
    extraClass: "bp3-intent-primary",
    omschrijving: "Betaalmethoden",
    link: "/lijsten/betaalmethoden",
    route: (
      <Route key="3" path="/lijsten/betaalmethoden" component={NotFound} />
    ),
  },
  {
    id: "4",
    extraClass: "bp3-intent-primary",
    omschrijving: "Evenement categoriëen",
    link: "/lijsten/evenementcategorieen",
    route: (
      <Route
        key="4"
        path="/lijsten/evenementcategorieen"
        component={NotFound}
      />
    ),
  },
  {
    id: "5",
    extraClass: "bp3-intent-primary",
    omschrijving: "Inschrijvingsstatussen",
    link: "/lijsten/inschrijvingsstatussen",
    route: (
      <Route
        key="5"
        path="/lijsten/inschrijvingsstatussen"
        component={NotFound}
      />
    ),
  },
  {
    id: "6",
    omschrijving: "Evenementen",
    link: "/lijsten/evenementen",
    route: <Route key="6" path="/lijsten/evenementen" component={NotFound} />,
  },
  {
    id: "7",
    omschrijving: "Betaaltransacties",
    link: "/lijsten/betaaltransacties",
    route: (
      <Route key="7" path="/lijsten/betaaltransacties" component={NotFound} />
    ),
  },
  {
    id: "8",
    omschrijving: "Check ins",
    link: "/lijsten/checkins",
    route: <Route key="8" path="/lijsten/checkins" component={NotFound} />,
  },
];

export default Lijsten;
