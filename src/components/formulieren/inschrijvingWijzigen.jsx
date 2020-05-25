import React from "react";
import Joi from "joi-browser";
import Formulier from "../gemeenschappelijk/formulieren/formulier";
import SpinnerInladenGegevens from "./../gemeenschappelijk/spinnerInladenGegevens";
import * as toaster from "../../services/toasterService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as formatteerService from "../../services/formatteerService";
import * as datumService from "../../services/datumService";
import * as betaalmethodenService from "../../services/api/betaalmethodenService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as evenementenService from "../../services/api/evenementenService";
import * as betaaltransactiesService from "../../services/api/betaaltransactiesService";
import * as instellingenService from "../../services/api/instellingenService";
import * as inschrijvingsstatusService from "../../services/api/inschrijvingsstatusService";
import InschrijvingStatus from "./../inschrijvingStatus";
import Tabel from "./../gemeenschappelijk/tabellen/tabel";

class FormulierinschrijvingWijzigen extends Formulier {
  state = {
    schema: this.schema,
    errors: {},
    data: {
      id: "",
      voornaam: "",
      achternaam: "",
      postcode: "",
      gemeente: "",
      prefixMobielNummer: "",
      mobielNummer: "",
      email: "",
      aantalMeter: 0,
      meterPrijs: 0,
      aantalWagens: 0,
      aantalAanhangwagens: 0,
      aantalMobilhomes: 0,
      opmerking: "",
      standnummer: "",
      betaalmethodeId: "",
      gestructureerdeMededeling: "",
      qrCode: "",
      redenAfkeuring: "",
      inschrijvingsstatusId: "",
      evenementId: "",
      lidId: "",
      datumInschrijving: "",
    },
    evenement: {
      id: "",
      naam: "",
      datumStartEvenement: undefined,
    },
    inschrijvingsId: "",
    inschrijvingsstatus: { id: "", naam: "" },
    betaalmethoden: [],
    betaaltransacties: [],
    openstaandBedrag: 0,
    minimumAantalMeter: 0,
    prijs: 0,
    kolommen: [],
    dataTabel: [],
    opdrachtVerwerken: false,
    opdrachtNietVerwerkt: false,
    gegevensInladen: false,
  };

  schema = {
    id: Joi.string().guid().required().label("Id"),
    voornaam: Joi.string().max(150).required().label("Voornaam"),
    achternaam: Joi.string().max(150).required().label("Achternaam"),
    postcode: Joi.string().min(4).max(4).required().label("Postcode"),
    gemeente: Joi.string().max(100).required().label("Gemeente"),
    prefixMobielNummer: Joi.string().max(6).required().label("Landnummer"),
    mobielNummer: Joi.string().min(9).max(9).required().label("Mobiel nummer"),
    email: Joi.string().email().max(200).required().label("E-mail"),
    aantalMeter: Joi.number()
      .min(this.state.minimumAantalMeter)
      .required()
      .label("Aantal meter"),
    meterPrijs: Joi.number().required().label("Meterprijs"),
    aantalWagens: Joi.number().min(0).allow(null).label("Aantal wagens"),
    aantalAanhangwagens: Joi.number()
      .min(0)
      .allow(null)
      .label("Aantal aanhangwagens"),
    aantalMobilhomes: Joi.number()
      .min(0)
      .allow(null)
      .label("Aantal mobilhomes"),
    opmerking: Joi.string().max(200).allow(null).allow("").label("Opmerking"),
    inschrijvingsstatusId: Joi.string()
      .guid()
      .required()
      .label("Inschrijvingsstatus"),
    betaalmethodeId: Joi.string().guid().required().label("Betaalmethode"),
    evenementId: Joi.string().guid().required().label("Evenement"),
    lidId: Joi.string().guid().allow(null).allow("").label("Lid"),
    datumInschrijving: Joi.date().label("Datum inschrijving"),
    gestructureerdeMededeling: Joi.string()
      .allow(null)
      .allow("")
      .label("Gestructureerde mededeling"),
    qrCode: Joi.string().allow(null).allow("").label("QR Code"),
    redenAfkeuring: Joi.string()
      .allow(null)
      .allow("")
      .label("Reden afekeuring"),
    standnummer: Joi.string()
      .max(10)
      .allow(null)
      .allow("")
      .label("Standnummer"),
  };

  async componentDidMount() {
    this.setState({ gegevensInladen: true, schema: this.schema });
    const inschrijvingsId = this.props.match.params.inschrijvingsId;
    if (!(await inschrijvingenService.bestaatInschrijving(inschrijvingsId))) {
      this.props.history.push("/not-found");
    } else {
      this.setState({ inschrijvingsId: inschrijvingsId });
      await this.instellingenInladen();
      await this.inschrijvingInladen(this.state.inschrijvingsId);
      await this.evenementInladen(this.state.data.evenementId);
      await this.betaalmethodenInladen();
      await this.betaalTransactiesInladen(this.state.inschrijvingsId);
      await this.inschrijvingsstatusInladen();
      const kolommen = this.kolommen();
      const dataTabel = await this.dataTabel();
      this.setState({
        kolommen: kolommen,
        dataTabel: dataTabel,
        gegevensInladen: false,
      });
    }
  }

  render() {
    const {
      evenement,
      minimumAantalMeter,
      prijs,
      opdrachtVerwerken,
      opdrachtNietVerwerkt,
    } = this.state;
    return (
      <div>
        {this.state.gegevensInladen && <SpinnerInladenGegevens />}
        <form onSubmit={this.handleVerzendFormulier}>
          {this.genereerTitel(
            "inschrijvingAanpassenH1",
            "Inschrijving aanpassen",
            1,
            this.state.inschrijvingsId,
            undefined,
            [
              {
                id: "betalingToevoegenH1",
                inhoud: "Betaling toevoegen",
                intent: "primary",
                onKlik: this.handleKlikNieuweBetaling,
              },
              {
                id: "IncheckenH1",
                inhoud: "Inchecken",
                intent: "primary",
                onKlik: this.handleKlikCheckIn,
              },
            ]
          )}
          {evenement &&
            evenement.datumStartEvenement &&
            this.genereerMededeling(
              "evenementDatum",
              evenement.naam,
              "Dit evenement vindt plaats op " +
                datumService.getDatumBelgischeNotatie(
                  evenement.datumStartEvenement
                ) +
                ".",
              "timeline-events",
              "Success"
            )}
          <div>
            <h2>Persoonlijk:</h2>
            {this.state.inschrijvingsId &&
              this.state.data.datumInschrijving &&
              this.genereerMededeling(
                "inschrijvingsDatum",
                "",
                "Deze inschrijving werd ingediend op " +
                  datumService.getDatumBelgischeNotatie(
                    new Date(this.state.data.datumInschrijving)
                  ) +
                  ".",
                "info-sign",
                "Primary"
              )}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "voornaam",
                "Voornaam",
                "",
                "",
                "person",
                false,
                true
              ),
              this.genereerTekstvak(
                "achternaam",
                "Achternaam",
                "",
                "",
                "person",
                false,
                true
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "postcode",
                "Postcode",
                "",
                "",
                "home",
                false,
                true
              ),
              this.genereerTekstvak(
                "gemeente",
                "Gemeente",
                "",
                "",
                "home",
                false,
                true
              ),
            ])}
            {this.genereerMobielNummer(
              "prefixMobielNummer",
              "mobielNummer",
              "",
              false,
              true
            )}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "email",
                "E-mail",
                "",
                "",
                "envelope",
                false,
                true
              ),
            ])}
          </div>
          <div>
            <h2>Praktisch:</h2>
            {this.genereerFormulierGroep([
              this.genereerNumeriekVak(
                "aantalMeter",
                "Aantal meter",
                "",
                "",
                minimumAantalMeter,
                undefined,
                false,
                true,
                undefined,
                this.handleWijzigingAantalMeter
              ),
              this.genereerNumeriekVak(
                "prijs",
                "Prijs (€)",
                "",
                "",
                undefined,
                undefined,
                true,
                false,
                prijs
              ),
            ])}
            {this.genereerMededeling(
              "minimumAanTeKopenHoeveelheid",
              "",
              "Minimum aan te kopen hoeveelheid (lopende meter):  " +
                minimumAantalMeter,
              "info-sign",
              "Primary"
            )}
            {this.genereerFormulierGroep([
              this.genereerNumeriekVak(
                "aantalWagens",
                "Aantal wagens",
                "",
                "",
                0
              ),
              this.genereerNumeriekVak(
                "aantalAanhangwagens",
                "Aantal aanhangwagens",
                "",
                "",
                0
              ),
              this.genereerNumeriekVak(
                "aantalMobilhomes",
                "Aantal mobilhomes",
                "",
                "",
                0
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstveld("opmerking", "Opmerking"),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak("standnummer", "Standnummer"),
            ])}
          </div>
          <div>
            <h2>Status:</h2>
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "inschrijvingsstatusId",
                "Inschrijvingsstatus",
                "",
                "",
                "",
                true,
                true,
                this.state.inschrijvingsstatus.naam
              ),
            ])}
            {this.state.data.redenAfkeuring &&
              this.genereerFormulierGroep([
                this.genereerTekstvak(
                  "redenAfkeuring",
                  "Reden afkeuring",
                  "",
                  "",
                  "",
                  true,
                  false
                ),
              ])}
            <h2>Betaalmethode:</h2>
            {this.genereerFormulierGroep([
              this.genereerRadio(
                "betaalmethodeId",
                "Betaalmethode",
                this.state.betaalmethoden,
                true
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "gestructureerdeMededeling",
                "Gestructureerde mededeling",
                "",
                "",
                "",
                true,
                false,
                this.state.data.gestructureerdeMededeling
                  ? formatteerService.getGeformateerdeGestructureerdeMededeling(
                      this.state.data.gestructureerdeMededeling
                    )
                  : ""
              ),
            ])}
            {this.genereerTitel(
              "betalingenH2",
              "Betalingen",
              2,
              "",
              undefined,
              [
                {
                  id: "betalingToevoegen",
                  inhoud: "Nieuw",
                  intent: "primary",
                  onKlik: this.handleKlikNieuweBetaling,
                },
              ]
            )}
            {this.genereerMededeling(
              "openstaandBedrag",
              this.state.openstaandBedrag >= 0
                ? "Openstaand bedrag"
                : "Terug te storten bedrag",
              "€ " + Math.abs(this.state.openstaandBedrag),
              "bank-account",
              this.state.openstaandBedrag > 0 ? "Warning" : "Success"
            )}
            {this.state.betaaltransacties &&
              this.state.betaaltransacties.length > 0 && (
                <Tabel
                  kolommen={this.state.kolommen}
                  data={this.state.dataTabel}
                  zonderHoofding={false}
                />
              )}
            <h2>Check-ins:</h2>
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "qrCode",
                "QR Code",
                "",
                "",
                "",
                true,
                false
              ),
            ])}
            {this.state.data.qrCode &&
              this.genereerQrCode(this.state.data.qrCode)}
            {!this.state.data.qrCode &&
              this.genereerMededeling(
                "qrCodeNietAanwezig",
                "",
                "De QR Code wordt pas gegenereerd wanneer de aanvraag is goedgekeurd.",
                "info-sign",
                "primary"
              )}
          </div>
          {this.genereerVerzendKnopMetAttributen(
            opdrachtNietVerwerkt,
            opdrachtVerwerken,
            "Opslaan",
            "Fout opgetreden",
            "De aanpassingen zijn niet opgeslagen."
          )}
        </form>
      </div>
    );
  }

  // === === === === ===
  // Inladen
  kolommen = () => {
    return [
      {
        id: "datumBetaling",
        naam: "Datum",
        veld: "datum",
        verbergBijSmaller: false,
      },
      {
        id: "betaalmethode",
        naam: "Betaalmethode",
        veld: "betaalmethode",
        verbergBijSmaller: false,
      },
      {
        id: "verantwoordelijkeBetaling",
        naam: "Verantwoordelijke",
        veld: "verantwoordelijkeBetaling",
        verbergBijSmaller: true,
      },
      {
        id: "bedrag",
        naam: "Bedrag",
        veld: "bedrag",
        verbergBijSmaller: false,
      },
    ];
  };

  dataTabel = async () => {
    const betaaltransacties = [...this.state.betaaltransacties];
    for (let index = 0; index < betaaltransacties.length; index++) {
      const betaaltransactie = betaaltransacties[index];
      betaaltransactie.datum = datumService.getDatumBelgischeNotatie(
        new Date(betaaltransactie.datumBetaling)
      );
      betaaltransactie.betaalmethode = await this.naamBetaalmethode(
        betaaltransactie.betaalmethodeId
      );
    }
    return betaaltransacties;
  };

  instellingenInladen = async () => {
    try {
      const {
        data: instellingen,
      } = await instellingenService.getInstellingenAanvraag();
      this.setState({
        minimumAantalMeter: instellingen.minimumAantalMeter,
      });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  inschrijvingInladen = async (inschrijvingsId) => {
    try {
      const {
        data: inschrijving,
      } = await inschrijvingenService.getInschrijving(inschrijvingsId);
      const prijs = inschrijving.aantalMeter * inschrijving.meterPrijs;
      this.setState({ data: inschrijving, prijs: prijs });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  evenementInladen = async (evenementId) => {
    try {
      const { data: evenementApi } = await evenementenService.getEvenement(
        evenementId
      );
      const evenement = { ...this.state.evenement };
      evenement.id = evenementApi.id;
      evenement.naam = evenementApi.naam;
      evenement.datumStartEvenement = new Date(
        evenementApi.datumStartEvenement
      );
      this.setState({ evenement: evenement });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  betaalmethodenInladen = async () => {
    try {
      const {
        data: betaalmethoden,
      } = await betaalmethodenService.getBetaalmethoden();
      const verschilInDagen = this.getVerschilInDagen();
      betaalmethoden.map(
        (b) =>
          (b.alleenLezen = !betaalmethodenService.isBetaalmethodeNogGeldig(
            b,
            verschilInDagen
          ))
      );
      this.setState({ betaalmethoden: betaalmethoden });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  betaalTransactiesInladen = async (inschrijvingsId) => {
    try {
      const {
        data: betaaltransacties,
      } = await betaaltransactiesService.getBetaaltransactiesVanInschrijving(
        inschrijvingsId
      );
      this.setState({ betaaltransacties: betaaltransacties });
      this.berekenOpenstaandBedrag();
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  inschrijvingsstatusInladen = async () => {
    try {
      const {
        data: inschrijvingsstatus,
      } = await inschrijvingsstatusService.getInschrijvingsstatus(
        this.state.data.inschrijvingsstatusId
      );
      this.setState({ inschrijvingsstatus: inschrijvingsstatus });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  // === === === === ===
  // Events
  handleKlikNieuweBetaling = () => {
    this.props.history.push(
      "/inschrijvingen/" +
        this.state.inschrijvingsId +
        "/betaaltransacties/nieuw"
    );
  };

  handleKlikCheckIn = () => {
    this.props.history.push(
      "/inschrijvingen/" +
        this.state.inschrijvingsId +
        "/betaaltransacties/nieuw"
    );
  };

  handleWijzigingAantalMeter = (waardeAlsNummer, waardeAlsTekst, invoer) => {
    this.updateData(invoer);

    const { meterPrijs } = this.state.data;
    const prijs = meterPrijs * invoer.value;
    this.setState({ prijs: prijs });
  };

  // === === === === ===
  // Formulier verwerken
  verzendFormulier = async () => {
    this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const resultaat = await this.inschrijvingWijzigen();
    if (resultaat) {
      this.setState({ opdrachtVerwerken: false });
      this.props.history.push("/inschrijvingen/" + this.state.data.id);
    } else {
      this.setState({ opdrachtVerwerken: false, opdrachtNietVerwerkt: true });
    }
  };

  inschrijvingWijzigen = async () => {
    try {
      await inschrijvingenService.putInschrijving(this.state.data);
      toaster.infoToastAanmaken("Wijzigingen opgeslagen.");
      return true;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return false;
    }
  };

  // === === === === ===
  // Helpers
  getVerschilInDagen = () => {
    const beginPeriode = new Date();
    const eindePeriode = this.state.evenement.datumStartEvenement;
    return datumService.getDagenVerschilInPeriode(beginPeriode, eindePeriode);
  };

  berekenOpenstaandBedrag = () => {
    var openstaandBedrag = this.state.prijs;
    this.state.betaaltransacties.map((b) => (openstaandBedrag -= b.bedrag));
    this.setState({ openstaandBedrag: openstaandBedrag });
  };

  naamBetaalmethode = async (betaalmethodeId) => {
    try {
      const {
        data: betaalmethode,
      } = await betaalmethodenService.getBetaalmethode(betaalmethodeId);
      return betaalmethode ? betaalmethode.naam : betaalmethodeId;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };
}

export default FormulierinschrijvingWijzigen;
