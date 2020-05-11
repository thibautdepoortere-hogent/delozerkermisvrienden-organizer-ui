import React, { Component } from "react";
import Tabel from "../gemeenschappelijk/tabel";
import * as api from "../../services/api/evenementenService";
import * as toaster from "../../services/toasterService";
import Tekstvak from "../gemeenschappelijk/tekstvak";

class Evenementen extends Component {
  state = {
    kolommen: [],
    data: [],
  };

  componentDidCatch(error, info) {
    const foutData = { error: { error }, info: { info } };
    this.setState({ foutOpgetreden: true, foutData: foutData });
  }

  async componentDidMount() {
    await this.inschrijvingenInladen();
    const tabelKolommen = this.tabelKolommen();
    this.setState({ kolommen: tabelKolommen });
  }

  handleDelete = async (inschrijving) => {
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

  handleEdit = (inschrijving) => {
    console.log("Inschrijving bewerken: ", inschrijving);
  };

  render() {
    return (
      <React.Fragment>
        <h1>Inschrijvingen</h1>
        <div className="filters">
          <Tekstvak id="zoekQuery" omschrijving="Zoeken" icoon="search" />
        </div>
        <Tabel kolommen={this.state.kolommen} data={this.state.data} />
      </React.Fragment>
    );
  }

  inschrijvingenInladen = async () => {
    try {
      const { data } = await api.inschrijvingenOphalen();
      this.setState({ data: data });
    } catch (error) {
      toaster.errorToastAanmaken(
        "Er is een onverwachte fout opgetreden bij het inladen van de inschrijvingen."
      );
    }
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
        velden: ["voornaam", "achternaam"],
        scheidingsteken: " ",
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
      {
        id: 7,
        actie: "bewerken",
        actieEvent: this.handleEdit,
        verbergBijSmaller: false,
      },
      {
        id: 8,
        actie: "verwijderen",
        actieEvent: this.handleDelete,
        verbergBijSmaller: true,
      },
    ];
  }
}

export default Evenementen;
