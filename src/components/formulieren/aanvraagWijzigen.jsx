import React from "react";
import Joi from "joi-browser";
import * as toaster from "../../services/toasterService";
import Formulier from "../gemeenschappelijk/formulieren/formulier";
import * as betaalmethodenService from "../../services/api/betaalmethodenService";
import * as inschrijvingenService from "../../services/api/inschrijvingenService";
import * as evenementenService from "../../services/api/evenementenService";
import * as betaaltransactiesService from "../../services/api/betaaltransactiesService";
import * as instellingenService from "../../services/api/instellingenService";
import * as qrCodeService from "../../services/qrCodeService";
import * as responseErrorMeldingService from "../../services/api/responseErrorMeldingService";
import * as datumService from "../../services/datumService";
import * as guidService from "../../services/guidService";
import Titel from "../gemeenschappelijk/titel";

class FormulierAanvraagWijzigen extends Formulier {
  state = {
    inschrijvingsId: "",
    errors: {},
    evenement: {
      id: "",
      naam: "",
      datumStartEvenement: undefined,
    },
    betaalmethoden: [],
    betaaltransacties: [],
    data: {
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
      inschrijvingsstatusId: "",
      evenementId: "",
      lidId: "",
    },
    openstaandBedrag: 0,
    minimumAantalMeter: 0,
    prijs: 0,
    opdrachtVerwerken: false,
    opdrachtNietVerwerkt: false,
  };

  schema = {
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
    aantalWagens: Joi.number().min(0).label("Aantal wagens"),
    aantalAanhangwagens: Joi.number().min(0).label("Aantal aanhangwagens"),
    aantalMobilhomes: Joi.number().min(0).label("Aantal mobilhomes"),
    opmerking: Joi.string().max(200).allow(null).allow("").label("Opmerking"),
    inschrijvingsstatusId: Joi.string()
      .guid()
      .required()
      .label("Inschrijvingsstatus"),
    betaalmethodeId: Joi.string().guid().required().label("Betaalmethode"),
    evenementId: Joi.string().guid().required().label("Evenement"),
    lidId: Joi.string().guid().allow(null).allow("").label("Lid"),
  };

  async componentDidMount() {
    const inschrijvingsId = this.props.match.params.id;
    const guid = guidService.getGuidFormaat(inschrijvingsId);
    if (guidService.isGuid(guid)) {
      if (inschrijvingenService.bestaatInschrijving(guid)) {
        this.setState({ inschrijvingsId: this.props.match.params.id });
      } else {
        this.props.history.push("/not-found");
      }
    } else {
      this.props.history.push("/not-found");
    }
    this.setState({ inschrijvingsId: this.props.match.params.id });
    await this.instellingenInladen();
    await this.inschrijvingInladen(this.state.inschrijvingsId);
    this.evenementInladen(this.state.data.evenementId);
    await this.betaalmethodenInladen();
    await this.betaalTransactiesInladen(this.state.inschrijvingsId);
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
        <Titel
          omschrijving="Inschrijving aanpassen"
          extraInfo={this.state.inschrijvingsId}
        />
        {evenement &&
          evenement.datumStartEvenement &&
          this.genereerBelangrijkeMededeling(
            evenement.naam,
            "Dit evenement vindt plaats op " +
              datumService.getDatumBelgischeNotatie(
                evenement.datumStartEvenement
              ) +
              ".",
            "Success",
            "timeline-events"
          )}
        <form onSubmit={this.handleVerzendFormulier}>
          <div>
            <h2>Persoonlijk:</h2>
            {this.state.inschrijvingsId &&
              this.state.data.datumInschrijving &&
              this.genereerBelangrijkeMededeling(
                "",
                "Deze inschrijving werd ingediend op " +
                  datumService.getDatumBelgischeNotatie(
                    new Date(this.state.data.datumInschrijving)
                  ) +
                  ".",
                "Primary",
                "info-sign"
              )}
            {this.genereerFormulierGroep([
              this.genereerTekstvak("voornaam", "Voornaam", "person", "", true),
              this.genereerTekstvak(
                "achternaam",
                "Achternaam",
                "person",
                "",
                true
              ),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak("postcode", "Postcode", "home", "", true),
              this.genereerTekstvak("gemeente", "Gemeente", "home", "", true),
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
                undefined,
                this.handleWijzigingAantalMeter
              ),
              this.genereerNumeriekVak(
                "prijs",
                "Prijs (€)",
                undefined,
                undefined,
                false,
                true,
                "",
                prijs
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
              this.genereerTekstveld("opmerking", "Opmerking", "", ""),
            ])}
            {this.genereerFormulierGroep([
              this.genereerTekstvak("standnummer", "Standnummer"),
            ])}
          </div>
          <div>
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
                "",
                betaaltransactiesService.getGeformateerdeGestructureerdeMededeling(
                  this.state.data.gestructureerdeMededeling
                )
              ),
            ])}
            <h2>Betalingen:</h2>
            {this.genereerBelangrijkeMededeling(
              this.state.openstaandBedrag >= 0
                ? "Openstaand bedrag"
                : "Terug te storten bedrag",
              "€ " + Math.abs(this.state.openstaandBedrag),
              this.state.openstaandBedrag > 0 ? "Warning" : "Success"
            )}
            <h2>Check-ins:</h2>
            {this.genereerFormulierGroep([
              this.genereerTekstvak("qrCode", "QR Code", "", "", false, true),
            ])}
            <div className="qrCode">
              {qrCodeService.genereerQrCode(this.state.data.qrCode)}
            </div>
          </div>
          {this.genereerVerzendFormulierMetExtras(
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

  instellingenInladen = async () => {
    try {
      const {
        data: instellingen,
      } = await instellingenService.instellingenAanvraagOphalen();
      const minimumAantalMeter = instellingen.minimumAantalMeter;
      this.setState({
        minimumAantalMeter: minimumAantalMeter,
      });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de instellingen."
      );
    }
  };

  inschrijvingInladen = async (inschrijvingsId) => {
    try {
      const {
        data: inschrijving,
      } = await inschrijvingenService.inschrijvingOphalen(inschrijvingsId);
      const data = { ...this.state.data };
      this.objectGegevensToekkennenAanInternObject(inschrijving, data);
      const prijs = data.aantalMeter * data.meterPrijs;
      this.setState({ data: data, prijs: prijs });
    } catch (error) {
      if (error.response === "404") {
        this.props.history.push("/not-found");
      }
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de inschrijving."
      );
    }
  };

  evenementInladen = async (evenementId) => {
    try {
      const {
        data: opgehaaldEvenement,
      } = await evenementenService.evenementOphalen(evenementId);
      const evenement = { ...this.state.evenement };
      evenement.id = opgehaaldEvenement.id;
      evenement.naam = opgehaaldEvenement.naam;
      evenement.datumStartEvenement = new Date(
        opgehaaldEvenement.datumStartEvenement
      );
      this.setState({ evenement: evenement });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van het evenement."
      );
    }
  };

  betaalmethodenInladen = async () => {
    try {
      const {
        data: alleBetaalmethoden,
      } = await betaalmethodenService.betaalmethodenOphalen();
      const betaalmethoden = [...alleBetaalmethoden];
      const verschilInDagen = this.getVerschilInDagen();
      betaalmethoden.map(
        (b) =>
          (b.inactief = !betaalmethodenService.isBetaalmethodeNogGeldig(
            b,
            verschilInDagen
          ))
      );
      this.setState({ betaalmethoden: betaalmethoden });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de betaalmethoden."
      );
    }
  };

  betaalTransactiesInladen = async (inschrijvingsId) => {
    try {
      const {
        data: betaaltransacties,
      } = await betaaltransactiesService.betaaltransactiesVanInschrijvingOphalen(
        inschrijvingsId
      );
      this.setState({ betaaltransacties: betaaltransacties });
      this.berekenOpenstaandBedrag();
    } catch (error) {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de betaaltransacties."
      );
    }
  };

  handleWijzigingAantalMeter = (waardeAlsNummer, waardeAlsTekst, invoer) => {
    this.updateData(invoer);

    const { meterPrijs } = this.state.data;
    const prijs = meterPrijs * invoer.value;
    this.setState({ prijs: prijs });
  };

  verzendFormulier = async () => {
    this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const id = await this.aanvraagIndienen();
    if (id) {
      this.setState({ opdrachtVerwerken: false });
      this.props.history.push("/inschrijvingen/" + id);
    } else {
      this.setState({ opdrachtVerwerken: false });
    }
  };

  aanvraagIndienen = async () => {
    try {
      const { data: response } = await inschrijvingenService.aanvraagIndienen(
        this.state.data
      );
      toaster.infoToastAanmaken("Aanvraag ingediend.");
      return response.id;
    } catch (error) {
      this.setState({ opdrachtNietVerwerkt: true });
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "De aanvraag is niet goed opgebouwd."
      );
      return undefined;
    }
  };

  objectGegevensToekkennenAanInternObject = (opgehaaldObject, internObject) => {
    Object.entries(opgehaaldObject).map(([key, value]) => {
      internObject[key] = value;
    });
  };

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
}

export default FormulierAanvraagWijzigen;
