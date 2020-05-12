import React, { Component } from "react";
import FormulierGroepTekstvak from "./../gemeenschappelijk/formulieren/groepTekstvak";
import FormulierGroepTekstveld from "./../gemeenschappelijk/formulieren/groepTekstveld";
import FormulierGroepMobielNummer from "./../gemeenschappelijk/formulieren/groepMobielNummer";

class FormulierNieuweAanvraag extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Nieuwe aanvraag</h1>
        <form onSubmit={this.handleVerzendFormulier}>
          <div>
            <FormulierGroepTekstvak
              id="voornaam"
              omschrijving="Voornaam"
              waarde=""
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
            <FormulierGroepTekstvak
              id="achternaam"
              omschrijving="Achternaam"
              waarde=""
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
            <FormulierGroepTekstvak
              id="postcode"
              omschrijving="Postcode"
              waarde=""
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
            />
            <FormulierGroepTekstvak
              id="gemeente"
              omschrijving="Gemeente"
              waarde=""
              placeholder=""
              verplicht={true}
              onInhoudGewijzigd={this.handleTempChange}
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
            <FormulierGroepTekstvak
              id="aantalMeter"
              omschrijving="Aantal meter"
              waarde="3"
              placeholder=""
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
        </form>
      </div>
    );
  }
}

const handleTempChange = () => {
  console.log("handle temp change");
};

const handleVerzendFormulier = () => {
  console.log("hanlde verzendformulier");
};

export default FormulierNieuweAanvraag;
