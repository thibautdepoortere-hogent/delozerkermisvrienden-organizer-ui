import React, { Component } from "react";
import * as api from "../../../services/api/inschrijvingenService";
import * as toaster from "../../../services/toasterService";
import Tabel from "../../gemeenschappelijk/tabellen/tabel";
import FilterZoekTekstvak from "./../../gemeenschappelijk/filteren/zoeken";
import Titel from "../../gemeenschappelijk/titel";
import NotFound from "./../../notFound";

class Inschrijvingen extends Component {
  state = {
    kolommen: [],
    data: [],
    zoekVoornaam: "",
    zoekAchternaam: "",
    zoekGemeente: "",
    zoekMobielNummer: "",
    periode: { startDatum: "", eindDatum: "" },
  };

  async componentDidMount() {
    await this.inschrijvingenInladen();
    this.kolommenInladen();
  }

  handlePeriode = (periode) => {
    // // //
    console.log(periode);
  };

  handlezoekVoornaamGewijzigd = (query) => {
    this.setState({ zoekVoornaam: query });
  };

  handlezoekVoornaamWissen = () => {
    this.setState({ zoekVoornaam: "" });
  };

  handlezoekAchternaamGewijzigd = (query) => {
    this.setState({ zoekAchternaam: query });
  };

  handlezoekAchternaamWissen = () => {
    this.setState({ zoekAchternaam: "" });
  };

  handleZoekGemeenteGewijzigd = (query) => {
    this.setState({ zoekGemeente: query });
  };

  handleZoekGemeenteWissen = () => {
    this.setState({ zoekGemeente: "" });
  };

  handleZoekMobielNummerGewijzigd = (query) => {
    this.setState({ zoekMobielNummer: query });
  };

  handleZoekMobielNummerWissen = () => {
    this.setState({ zoekMobielNummer: "" });
  };

  handleAlleFiltersWissen = () => {
    this.setState({
      zoekVoornaam: "",
      zoekAchternaam: "",
      zoekGemeente: "",
      zoekMobielNummer: "",
      periode: { startDatum: "", eindDatum: "" },
    });
  };

  handleInschrijvingGewijzigd = (inschrijving) => {
    console.log("Inschrijving bewerken: ", inschrijving);
  };

  handleInschrijvingWissen = async (inschrijving) => {
    try {
      await api.inschrijvingVerwijderen(inschrijving.id);
      this.inschrijvingenInladen();
      toaster.infoToastAanmaken("Inschrijving verwijderd.");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toaster.errorToastAanmaken(
            "Deze inschrijving is niet meer beschikbaar."
          );
        } else if (error.response.status === 400) {
          toaster.errorToastAanmaken("De aanvraag is niet goed opgebouwd!");
        }
      }
    }
  };

  render() {
    const {
      zoekVoornaam,
      zoekAchternaam,
      zoekGemeente,
      zoekMobielNummer,
      kolommen,
    } = this.state;
    const { data } = this.gefilterdeInschrijvingenInladen();
    return (
      <React.Fragment>
        <NotFound />
        <NotFound />
        <NotFound />
        <NotFound />
        <NotFound />
      </React.Fragment>
    );
  }

  inschrijvingenInladen = async () => {
    try {
      const { data } = await api.inschrijvingenOphalen();
      this.setState({ data: data });
      return true;
    } catch (error) {
      toaster.errorToastAanmaken(
        "Er is een onverwachte fout opgetreden bij het inladen van de inschrijvingen."
      );
    }
  };

  inschrijvingenHerladen = async () => {
    if (await this.inschrijvingenInladen()) {
      toaster.infoToastAanmaken("Gegevens herladen voltooid.");
    }
  };

  kolommenInladen = () => {
    const tabelKolommen = this.tabelKolommen();
    this.setState({ kolommen: tabelKolommen });
  };

  gefilterdeInschrijvingenInladen = () => {
    const {
      data: alleInschrijvingen,
      zoekVoornaam,
      zoekAchternaam,
      zoekGemeente,
      zoekMobielNummer,
    } = this.state;

    let gefilterd = alleInschrijvingen;

    if (zoekVoornaam) {
      gefilterd = gefilterd.filter((i) =>
        i.voornaam.toLowerCase().includes(zoekVoornaam.toLowerCase())
      );
    }
    if (zoekAchternaam) {
      gefilterd = gefilterd.filter((i) =>
        i.achternaam.toLowerCase().includes(zoekAchternaam.toLowerCase())
      );
    }
    if (zoekGemeente) {
      gefilterd = gefilterd.filter((i) =>
        i.gemeente.toLowerCase().includes(zoekGemeente.toLowerCase())
      );
    }
    if (zoekMobielNummer) {
      gefilterd = gefilterd.filter((i) =>
        "0"
          .concat(i.mobielNummer.replace(" ", ""))
          .includes(zoekMobielNummer.replace(" ", ""))
      );
    }

    return { data: gefilterd };
  };

  tabelKolommen() {
    return [
      {
        id: 1,
        naam: "Datum inschrijving",
        veld: "datumInschrijving",
        formatteer: "datum",
        verbergBijSmaller: true,
      },
      {
        id: 2,
        naam: "Naam",
        velden: ["achternaam", "voornaam"],
        scheidingsteken: ", ",
        verbergBijSmaller: false,
      },
      {
        id: 3,
        naam: "Postcode",
        veld: "postcode",
        verbergBijSmaller: true,
      },
      {
        id: 4,
        naam: "Gemeente",
        veld: "gemeente",
        verbergBijSmaller: false,
      },
      {
        id: 5,
        naam: "Mobiel nummer",
        velden: ["prefixMobielNummer", "mobielNummer"],
        scheidingsteken: " ",
        formatteer: "telefoon",
        verbergBijSmaller: true,
      },
      {
        id: 6,
        naam: "Aantal meter",
        veld: "aantalMeter",
        verbergBijSmaller: false,
      },
      // {
      //   id: 7,
      //   actie: "bewerken",
      //   actieEvent: this.handleInschrijvingGewijzigd,
      //   verbergBijSmaller: false,
      // },
      {
        id: 8,
        actie: "verwijderen",
        actieEvent: this.handleInschrijvingWissen,
        verbergBijSmaller: false,
      },
    ];
  }
}

export default Inschrijvingen;
