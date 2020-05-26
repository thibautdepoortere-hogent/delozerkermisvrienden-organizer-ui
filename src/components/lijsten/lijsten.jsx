import React from "react";
import Basis from "./../gemeenschappelijk/basis";
import Knop from "./../gemeenschappelijk/knop";
import * as inschrijvingsstatusService from "../../services/api/inschrijvingsstatusService";

class Lijsten extends Basis {
  render() {
    return (
      <div className="lijsten">
        <div className="lijsten-lijst">
          {this.lijstInschrijvingen().map((lijst) => (
            <div key={lijst.id}>
              {this.genereerFormulierGroep([
                <Knop
                  key={lijst.id}
                  id={lijst.id}
                  inhoud={lijst.inhoud}
                  intent={lijst.intent}
                  icoon={lijst.icoon}
                  vullen={true}
                  onKlik={this.handleKlikKnopLijstInschrijvingen}
                />,
              ])}
            </div>
          ))}
        </div>
        <div className="lijsten-lijst">
          {this.lijstActies().map((lijst) => (
            <div key={lijst.id}>
              {this.genereerFormulierGroep([
                <Knop
                  key={lijst.id}
                  id={lijst.id}
                  inhoud={lijst.inhoud}
                  intent={lijst.intent}
                  icoon={lijst.icoon}
                  vullen={true}
                  onKlik={this.handleKlikKnopLijstActies}
                />,
              ])}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Info van status 'titel' van service halen! al 2 keer in deze applicatie!!!
  lijstInschrijvingen = () => {
    return [
      {
        id: "inschrijvingenAanvraag",
        inhoud: inschrijvingsstatusService.getInschrijvingsstatusTitelViaFilter(
          "aangevraagd"
        ),
        intent: "primary",
        icoon: "flag",
        url: "/lijst/inschrijvingen/aangevraagd",
      },
      {
        id: "inschrijvingenGoedgekeurd",
        inhoud: inschrijvingsstatusService.getInschrijvingsstatusTitelViaFilter(
          "goedgekeurd"
        ),
        intent: "primary",
        icoon: "flag",
        url: "/lijst/inschrijvingen/goedgekeurd",
      },
      {
        id: "inschrijvingenGepland",
        inhoud: inschrijvingsstatusService.getInschrijvingsstatusTitelViaFilter(
          "gepland"
        ),
        intent: "primary",
        icoon: "flag",
        url: "/lijst/inschrijvingen/gepland",
      },
      {
        id: "inschrijvingenAfgekeurd",
        inhoud: inschrijvingsstatusService.getInschrijvingsstatusTitelViaFilter(
          "afgekeurd"
        ),
        intent: "primary",
        icoon: "flag",
        url: "/lijst/inschrijvingen/afgekeurd",
      },
    ];
  };

  lijstActies = () => {
    return [
      {
        id: "aanvraagIndienen",
        inhoud: "Aanvraag indienen",
        intent: "success",
        icoon: "plus",
        url: "/inschrijvingen/nieuw",
      },
      {
        id: "inschrijvingOpzoeken",
        inhoud: "Inschrijving opzoeken",
        intent: "success",
        icoon: "search",
        url: "/inschrijvingen/opzoeken",
      },
    ];
  };

  handleKlikKnopLijstInschrijvingen = ({ currentTarget: knop }) => {
    const lijst = this.lijstInschrijvingen().filter((l) => l.id === knop.id);
    if (lijst) {
      const url = lijst[0].url;
      url && this.props.history.push(url);
    }
  };

  handleKlikKnopLijstActies = ({ currentTarget: knop }) => {
    const lijst = this.lijstActies().filter((l) => l.id === knop.id);
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
