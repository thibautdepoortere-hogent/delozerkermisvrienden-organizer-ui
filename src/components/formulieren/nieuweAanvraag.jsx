import React, { Component } from "react";
import * as api from "../../services/api/betaalmethodenService";
import { Toaster } from "@blueprintjs/core";
import FormulierGroepTekstvak from "./../gemeenschappelijk/formulieren/groepTekstvak";
import FormulierGroepTekstveld from "./../gemeenschappelijk/formulieren/groepTekstveld";
import FormulierGroepMobielNummer from "./../gemeenschappelijk/formulieren/groepMobielNummer";
import { betaalmethodenOphalen } from "./../../services/api/betaalmethodenService";
import FormulierGroepRadio from "../gemeenschappelijk/formulieren/groepRadio";
import FormulierGroep from "../gemeenschappelijk/formulieren/groep";
import FormulierGroepNumeriekVak from "./../gemeenschappelijk/formulieren/groepNumeriekVak";
import BelangrijkeMededeling from "../gemeenschappelijk/belangrijkeMededeling";

class FormulierNieuweAanvraag extends Component {
  state = {
    evenementStartDatum: new Date("06/20/2020"),
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
            <FormulierGroep
              data={[
                {
                  id: "voornaam",
                  item: (
                    <FormulierGroepTekstvak
                      id="voornaam"
                      omschrijving="Voornaam"
                      waarde=""
                      icoon="person"
                      placeholder=""
                      verplicht={true}
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
                {
                  id: "achternaam",
                  item: (
                    <FormulierGroepTekstvak
                      id="achternaam"
                      omschrijving="Achternaam"
                      waarde=""
                      icoon="person"
                      placeholder=""
                      verplicht={true}
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
              ]}
            />
            <FormulierGroep
              data={[
                {
                  id: "postcode",
                  item: (
                    <FormulierGroepTekstvak
                      id="postcode"
                      omschrijving="Postcode"
                      waarde=""
                      icoon="home"
                      placeholder=""
                      verplicht={true}
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
                {
                  id: "gemeente",
                  item: (
                    <FormulierGroepTekstvak
                      id="gemeente"
                      omschrijving="Gemeente"
                      waarde=""
                      icoon="home"
                      placeholder=""
                      verplicht={true}
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
              ]}
            />
            <FormulierGroepMobielNummer
              idPrefix="mobielNummer_prefix"
              idMobielNummer="mobielNummer_mobielNummer"
              waardePrefix=""
              waardeMobielNummer=""
              verplicht={true}
              onInhoudGewijzigdPrefix={this.handleTempChange}
              onInhoudGewijzigdMobielNummer={this.handleTempChange}
            />
            <FormulierGroep
              data={[
                {
                  id: "email",
                  item: (
                    <FormulierGroepTekstvak
                      id="email"
                      omschrijving="E-mail"
                      waarde=""
                      icoon="envelope"
                      placeholder=""
                      verplicht={true}
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div>
            <h2>Praktisch:</h2>
            <FormulierGroep
              data={[
                {
                  id: "aantalMeter",
                  item: (
                    <FormulierGroepNumeriekVak
                      id="aantalMeter"
                      omschrijving="Aantal meter"
                      waarde="3"
                      min="3"
                      verplicht={true}
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
                {
                  id: "prijsAangekochteLm",
                  item: (
                    <FormulierGroepNumeriekVak
                      id="prijsAangekochteLm"
                      omschrijving="Prijs aangekochte lm"
                      waarde="3"
                      enkelLezen={true}
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
              ]}
            />
            <BelangrijkeMededeling
              mededelingen={[
                {
                  id: "prijslm",
                  inhoud: "Prijs per lopende meter:  € 1,00",
                },
              ]}
              intent="primary"
            />
            <BelangrijkeMededeling
              mededelingen={[
                {
                  id: "mimimumlm",
                  inhoud: "Minimum aan te kopen hoeveelheid lopende meter:  3 ",
                },
              ]}
              intent="primary"
            />
            <FormulierGroep
              data={[
                {
                  id: "aantalWagens",
                  item: (
                    <FormulierGroepNumeriekVak
                      id="aantalWagens"
                      omschrijving="Aantal wagens"
                      waarde=""
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
                {
                  id: "aantalAanhangwagens",
                  item: (
                    <FormulierGroepNumeriekVak
                      id="aantalAanhangwagens"
                      omschrijving="Aantal aanhangwagens"
                      waarde=""
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
                {
                  id: "aantalMobilhomes",
                  item: (
                    <FormulierGroepNumeriekVak
                      id="aantalMobilhomes"
                      omschrijving="Aantal mobilhomes"
                      waarde=""
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
              ]}
            />
            <FormulierGroep
              data={[
                {
                  id: "opmerking",
                  item: (
                    <FormulierGroepTekstveld
                      id="opmerking"
                      omschrijving="Opmerking"
                      waarde=""
                      placeholder=""
                      verplicht={true}
                      onInhoudGewijzigd={this.handleTempChange}
                    />
                  ),
                },
              ]}
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
