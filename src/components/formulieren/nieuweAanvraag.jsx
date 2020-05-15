import React, { Component } from "react";
import * as apiBetaalmethoden from "../../services/api/betaalmethodenService";
import { Toaster } from "@blueprintjs/core";
import FormulierGroepTekstvak from "./../gemeenschappelijk/formulieren/groepTekstvak";
import FormulierGroepTekstveld from "./../gemeenschappelijk/formulieren/groepTekstveld";
import FormulierGroepMobielNummer from "./../gemeenschappelijk/formulieren/groepMobielNummer";
import FormulierGroepRadio from "../gemeenschappelijk/formulieren/groepRadio";
import FormulierGroep from "../gemeenschappelijk/formulieren/groep";
import FormulierGroepNumeriekVak from "./../gemeenschappelijk/formulieren/groepNumeriekVak";
import BelangrijkeMededeling from "../gemeenschappelijk/belangrijkeMededeling";
import Joi from "joi-browser";
import Formulier from "./../gemeenschappelijk/formulieren/formulier";
import Knop from "../gemeenschappelijk/knop";
import * as datumService from "../../services/datumService";

class FormulierNieuweAanvraag extends Formulier {
  state = {
    evenement: {
      id: "",
      naam: "Rommelmarkt",
      datumStartEvenement: new Date("05/16/2020"),
    },
    betaalmethoden: [],
    minimumAantalMeter: 3,
    data: {
      voornaam: "",
      achternaam: "",
      postcode: "",
      gemeente: "",
      prefixMobielNummer: "+32",
      mobielNummer: "",
      email: "",
      aantalMeter: 0,
      meterPrijs: 1,
      prijs: 0,
      aantalWagens: 0,
      aantalAanhangwagens: 0,
      aantalMobilhomes: 0,
      opmerking: "",
      InschrijvingsstatusId: "",
      betaalmethodeId: "",
      evenementId: "",
      lidId: "",
    },
    errors: {},
  };

  schema = {
    voornaam: Joi.string().required().label("Voornaam"),
    achternaam: Joi.string().required().label("Achternaam"),
    postcode: Joi.string().required().label("Postcode"),
    gemeente: Joi.string().required().label("Gemeente"),
    prefixMobielNummer: Joi.string().required().label("Landnummer"),
    mobielNummer: Joi.number().required().label("Mobiel nummer"),
    email: Joi.string().email().required().label("E-mail"),
    aantalMeter: Joi.number()
      .min(this.state.minimumAantalMeter)
      .required()
      .label("Aantal meter"),
    aantalWagens: Joi.number().min(0).label("Aantal wagens"),
    aantalAanhangwagens: Joi.number().min(0).label("Aantal aanhangwagens"),
    aantalMobilhomes: Joi.number().min(0).label("Aantal mobilhomes"),
    opmerking: Joi.string().label("Opmerking"),
    InschrijvingsstatusId: Joi.string().required().label("Inschrijvingsstatus"),
    betaalmethodeId: Joi.string().required().label("Betaalmethode"),
    evenementId: Joi.string().required().label("Evenement"),
    lidId: Joi.string().label("Lid"),
  };

  async componentDidMount() {
    await this.betaalmethodenInladen();
    const data = { ...this.state.data };
    data.aantalMeter = this.state.minimumAantalMeter;
    data.prijs = data.aantalMeter * data.meterPrijs;
    this.setState({ data: data });
  }

  render() {
    const { evenement, minimumAantalMeter } = this.state;
    return (
      <div>
        {this.genereerBelangrijkeMededeling(
          evenement.naam,
          "Dit evenement vindt plaats op " +
            datumService.getDatumBelgischeNotatie(
              evenement.datumStartEvenement
            ),
          "Success",
          "timeline-events"
        )}
        <h1>Nieuwe aanvraag</h1>
        <form onSubmit={this.handleVerzendFormulier}>
          <div>
            <h2>Persoonlijk:</h2>
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "voornaam",
                "Voornaam",
                "person",
                "",
                true,
                ""
              ),
              this.genereerTekstvak(
                "achternaam",
                "Achternaam",
                "person",
                "",
                true,
                ""
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "postcode",
                "Postcode",
                "home",
                "",
                true,
                ""
              ),
              this.genereerTekstvak(
                "gemeente",
                "Gemeente",
                "home",
                "",
                true,
                ""
              ),
            ])}
            {this.genereerMobielNummer(
              "prefixMobielNummer",
              "mobielNummer",
              true
            )}
            {this.genereerFormulierGroep([
              this.genereerTekstvak("email", "E-mail", "envelope", "", true),
            ])}
          </div>
          <div>
            <h2>Praktisch:</h2>
            {this.genereerFormulierGroep([
              this.genereerNumeriekVak(
                "aantalMeter",
                "Aantal meter",
                minimumAantalMeter,
                undefined,
                true,
                false,
                "",
                this.handleWijzigingAantalMeter
              ),
              this.genereerNumeriekVak(
                "prijs",
                "Prijs (€)",
                undefined,
                undefined,
                false,
                true
              ),
            ])}
            {this.genereerBelangrijkeMededeling(
              "",
              "Minimum aan te kopen hoeveelheid (lopende meter):  " +
                minimumAantalMeter,
              "Primary",
              "info-sign"
            )}
            {this.genereerFormulierGroep([
              this.genereerNumeriekVak(
                "aantalWagens",
                "Aantal wagens",
                0,
                undefined
              ),
              this.genereerNumeriekVak(
                "aantalAanhangwagens",
                "Aantal aanhangwagens",
                0,
                undefined
              ),
              this.genereerNumeriekVak(
                "aantalMobilhomes",
                "Aantal mobilhomes",
                0,
                undefined
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstveld("opmerking", "Omschrijving", "", "", true),
            ])}
          </div>
          <div>
            <h2>Betaalmethode</h2>
            {this.genereerRadio(
              "betaalmethodeId",
              "Betaalmethode",
              this.state.betaalmethoden,
              true
            )}
          </div>
          {this.genereerKnop("Indienen")}
        </form>
      </div>
    );
  }

  handleWijzigingAantalMeter = (waardeAlsNummer, waardeAlsTekst, invoer) => {
    this.updateData(invoer);

    const data = { ...this.state.data };
    data.prijs = data.meterPrijs * invoer.value;
    this.setState({ data: data });
  };

  verzendFormulier = () => {
    // Contacteer back-end
  };

  betaalmethodenInladen = async () => {
    try {
      const { data } = await apiBetaalmethoden.betaalmethodenOphalen();
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
    const beginPeriode = new Date();
    const eindePeriode = this.state.evenement.datumStartEvenement;
    return apiBetaalmethoden.isBetaalmethodeNogGeldig(
      betaalmethode,
      beginPeriode,
      eindePeriode
    );
  };
}

export default FormulierNieuweAanvraag;
