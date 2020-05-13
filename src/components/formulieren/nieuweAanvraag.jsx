import React, { Component } from "react";
import * as api from "../../services/api/betaalmethodenService";
import { Toaster } from "@blueprintjs/core";
import FormulierGroepTekstvak from "./../gemeenschappelijk/formulieren/groepTekstvak";
import FormulierGroepTekstveld from "./../gemeenschappelijk/formulieren/groepTekstveld";
import FormulierGroepMobielNummer from "./../gemeenschappelijk/formulieren/groepMobielNummer";
import { betaalmethodenOphalen } from "./../../services/api/betaalmethodenService";
import FormulierGroepRadio from "../gemeenschappelijk/formulieren/groepRadio";

class FormulierNieuweAanvraag extends Component {
  state = {
    evenementStartDatum: new Date("05/20/2020"),
    betaalmethoden: [],
    waardeBetaalmethode: "",
  };

  async componentDidMount() {
    await this.betaalmethodenInladen();
  }

  render() {
    return (
      <div>
        <h1>Nieuwe aanvraag</h1>
        <form onSubmit={this.handleVerzendFormulier}>
          <div>
            <h2>Persoonlijk:</h2>
            <div>
              <FormulierGroepTekstvak
                id="voornaam"
                omschrijving="Voornaam"
                waarde=""
                icoon="person"
                placeholder=""
                verplicht={true}
                onInhoudGewijzigd={this.handleTempChange}
              />
              <FormulierGroepTekstvak
                id="achternaam"
                omschrijving="Achternaam"
                waarde=""
                icoon="person"
                placeholder=""
                verplicht={true}
                onInhoudGewijzigd={this.handleTempChange}
              />
            </div>
            <div>
              <FormulierGroepTekstvak
                id="postcode"
                omschrijving="Postcode"
                waarde=""
                icoon="home"
                placeholder=""
                verplicht={true}
                onInhoudGewijzigd={this.handleTempChange}
              />
              <FormulierGroepTekstvak
                id="gemeente"
                omschrijving="Gemeente"
                waarde=""
                icoon="home"
                placeholder=""
                verplicht={true}
                onInhoudGewijzigd={this.handleTempChange}
              />
            </div>
            <FormulierGroepMobielNummer
              idPrefix="mobielNummer_prefix"
              idMobielNummer="mobielNummer_mobielNummer"
              waardePrefix=""
              waardeMobielNummer=""
              verplicht={true}
              onInhoudGewijzigdPrefix={this.handleTempChange}
              onInhoudGewijzigdMobielNummer={this.handleTempChange}
            />
            <FormulierGroepTekstvak
              id="email"
              omschrijving="E-mail"
              waarde=""
              icoon="envelope"
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
          </div>
          <div>
            <h2>Praktisch:</h2>
            <FormulierGroepTekstvak
              id="aantalMeter"
              omschrijving="Aantal meter"
              waarde="3"
              placeholder=""
              helperOmschrijving="Prijs per LM: € 1,00 / Minimum 3 LM per aanvraag"
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
            <FormulierGroepTekstvak
              id="aantalWagens"
              omschrijving="Aantal wagens"
              waarde=""
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
            <FormulierGroepTekstvak
              id="aantalAanhangwagens"
              omschrijving="Aantal aanhangwagens"
              waarde=""
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
            <FormulierGroepTekstvak
              id="aantalMobilhomes"
              omschrijving="Aantal mobilhomes"
              waarde=""
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
            <FormulierGroepTekstveld
              id="opmerking"
              omschrijving="Opmerking"
              waarde=""
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
          </div>
          <div>
            <h2>Betaalmethode</h2>
            <FormulierGroepRadio
              id="betaalmethoden"
              omschrijving="Betaalmethoden"
              waarde={this.state.waardeBetaalmethode}
              data={this.state.betaalmethoden}
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChangeBetaalmethode}
            />
          </div>
        </form>
      </div>
    );
  }

  handleTempChange = () => {
    console.log("handle temp change");
  };

  handleTempChangeBetaalmethode = (optie) => {
    this.setState({ waardeBetaalmethode: optie });
  };

  handleVerzendFormulier = () => {
    console.log("hanlde verzendformulier");
  };

  betaalmethodenInladen = async () => {
    try {
      const { data } = await api.betaalmethodenOphalen();
      const teGebruikenBetaalmethoden = data.filter((b) =>
        this.isBetaalmethodeNogGeldig(b)
      );
      this.setState({ betaalmethoden: teGebruikenBetaalmethoden });
      return true;
    } catch (error) {
      Toaster.errorToastAanmaken(
        "Er is een onverwachte fout opgetreden bij het inladen van de betaalmethoden."
      );
    }
  };

  isBetaalmethodeNogGeldig = (betaalmethode) => {
    const verschilInMiliseconden =
      Math.abs(this.state.evenementStartDatum) - Math.abs(new Date());
    const verschilInDagen = Math.ceil(
      verschilInMiliseconden / (1000 * 60 * 60 * 24)
    );
    if (verschilInDagen > betaalmethode.aantalDagenVroegerAfsluiten) {
      return true;
    }
  };
}

export default FormulierNieuweAanvraag;
