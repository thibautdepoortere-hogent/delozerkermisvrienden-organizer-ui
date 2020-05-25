import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBarLijsten from "./navBarLijsten";
import NotFound from "./../notFound";
import Basis from "./../gemeenschappelijk/basis";
import Knop from "./../gemeenschappelijk/knop";

class Lijsten extends Basis {
  render() {
    return this.lijsten().map((lijst) => (
      <Knop
        key={lijst.id}
        id={lijst.id}
        inhoud={lijst.inhoud}
        intent={lijst.intent}
        icoon={lijst.icoon}
        onKlik={this.handleKlikKnop}
      />
    ));
  }

  // Info van status 'titel' van service halen! al 2 keer in deze applicatie!!!
  lijsten = () => {
    return [
      {
        id: "inschrijvingenAanvraag",
        inhoud: "Nieuwe aanvragen",
        intent: "primary",
        icoon: "flag",
        url: "/lijst/inschrijvingen/aangevraagd",
      },
      {
        id: "inschrijvingenGoedgekeurd",
        inhoud: "Goedgekeurde inschrijvingen",
        intent: "primary",
        icoon: "flag",
        url: "/lijst/inschrijvingen/goedgekeurd",
      },
      {
        id: "inschrijvingenGepland",
        inhoud: "Ingeplande inschrijvingen",
        intent: "primary",
        icoon: "flag",
        url: "/lijst/inschrijvingen/gepland",
      },
      {
        id: "inschrijvingenAfgekeurd",
        inhoud: "Afgekeurde inschrijvingen",
        intent: "primary",
        icoon: "flag",
        url: "/lijst/inschrijvingen/afgekeurd",
      },
    ];
  };

  handleKlikKnop = ({ currentTarget: knop }) => {
    const lijst = this.lijsten().filter((l) => l.id === knop.id);
    if (lijst) {
      const url = lijst[0].url;
      url && this.props.history.push(url);
    }
  };
}

export default Lijsten;

// const lijstenOud = [
//   {
//     id: "2",
//     extraClass: "bp3-intent-success",
//     omschrijving: "Inschrijvingen",
//     link: "/lijst/inschrijvingen/goedgekeurd",
//     route: <Route key="2" path="/lijsten/inschrijvingen" />,
//   },
//   {
//     id: "1",
//     extraClass: "bp3-intent-warning",
//     omschrijving: "Aanvragen",
//     link: "/lijst/inschrijvingen/aangevraagd",
//   },
//   {
//     id: "3",
//     extraClass: "bp3-intent-primary",
//     omschrijving: "Betaalmethoden",
//     link: "/lijst/betaalmethoden",
//     route: (
//       <Route key="3" path="/lijsten/betaalmethoden" component={NotFound} />
//     ),
//   },
//   {
//     id: "4",
//     extraClass: "bp3-intent-primary",
//     omschrijving: "Evenement categoriëen",
//     link: "/lijst/evenementcategorieen",
//     route: (
//       <Route key="4" path="/lijst/evenementcategorieen" component={NotFound} />
//     ),
//   },
//   {
//     id: "5",
//     extraClass: "bp3-intent-primary",
//     omschrijving: "Inschrijvingsstatussen",
//     link: "/lijst/inschrijvingsstatussen",
//     route: (
//       <Route
//         key="5"
//         path="/lijst/inschrijvingsstatussen"
//         component={NotFound}
//       />
//     ),
//   },
//   {
//     id: "6",
//     omschrijving: "Evenementen",
//     link: "/lijst/evenementen",
//     route: <Route key="6" path="/lijsten/evenementen" component={NotFound} />,
//   },
//   {
//     id: "7",
//     omschrijving: "Betaaltransacties",
//     link: "/lijst/betaaltransacties",
//     route: (
//       <Route key="7" path="/lijsten/betaaltransacties" component={NotFound} />
//     ),
//   },
//   {
//     id: "8",
//     omschrijving: "Check ins",
//     link: "/lijst/checkins",
//     route: <Route key="8" path="/lijsten/checkins" component={NotFound} />,
//   },
// ];
