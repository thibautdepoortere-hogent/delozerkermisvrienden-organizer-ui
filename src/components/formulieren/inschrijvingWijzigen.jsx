import React from "react";
import Joi from "joi-browser";
import Formulier from "../gemeenschappelijk/formulieren/formulier";
import ProgressBarInladenGegevens from "../gemeenschappelijk/progressBarInladenGegevens";
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
import * as ledenService from "../../services/api/ledenService";
import Tabel from "./../gemeenschappelijk/tabellen/tabel";
import KaartEvenement from "./../gemeenschappelijk/kaartEvenement";
import Knop from "./../gemeenschappelijk/knop";
import * as authenticatieService from "../../services/api/authenticatieService";
import * as checkInService from "../../services/api/checkInService";

class FormulierinschrijvingWijzigen extends Formulier {
  _isMounted = false;

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
    lid: { voornaam: "", achternaam: "" },
    inschrijvingsId: "",
    inschrijvingsstatus: { id: "", naam: "" },
    inschrijvingsstatusGoedgekeurd: { id: "", naam: "" },
    inschrijvingsstatusAfgekeurd: { id: "", naam: "" },
    inschrijvingsstatusGepland: { id: "", naam: "" },
    inschrijvingsstatusIsAangevraagd: false,
    inschrijvingsstatusIsGoedgekeurd: false,
    inschrijvingsstatusIsAfgekeurd: false,
    inschrijvingsstatusIsGepland: false,
    betaalmethoden: [],
    betaaltransacties: [],
    checkIns: [],
    openstaandBedrag: 0,
    minimumAantalMeter: 0,
    prijs: 0,
    kolommenBetaaltransacties: [],
    dataTabelBetaaltransacties: [],
    kolommenCheckIns: [],
    dataTabelCheckIns: [],
    foutmeldingRedenAfkeuring: false,
    foutmeldingStandnummer: false,
    foutmeldingFormulierNietCorrectIngevuld: false,
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

  schemaIngepland = {
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
    standnummer: Joi.string().max(10).required().label("Standnummer"),
  };

  async componentDidMount() {
    this._isMounted = true;
    const id = authenticatieService.getActieveGebruikersId();
    if (id === "" || id === "geenid" || id === "geengebruiker") {
      this.props.history.push("/authenticatie/administrator");
    } else if (
      !authenticatieService.heeftActieveGebruikerToegang(["Administrator"])
    ) {
      this.props.history.push("/geentoegang");
    } else {
      this._isMounted &&
        this.setState({ gegevensInladen: true, schema: this.schema });
      const inschrijvingsId = this.props.match.params.inschrijvingsId;
      if (!(await inschrijvingenService.bestaatInschrijving(inschrijvingsId))) {
        this.props.history.push("/not-found");
      } else {
        this._isMounted && this.setState({ inschrijvingsId: inschrijvingsId });
        await this.instellingenInladen();
        await this.inschrijvingInladen();
        await this.evenementInladen();
        await this.betaalmethodenInladen();
        await this.betaalTransactiesInladen();
        await this.checkInsInladen();
        await this.inschrijvingsstatusInladen();
        await this.lidInladen();
        const kolommenBetaaltransacties = this.kolommenBetaaltransacties();
        const dataTabelBetaaltransacties = await this.dataTabelBetaaltransacties();
        const kolommenCheckIns = this.kolommenCheckIns();
        const dataTabelCheckIns = await this.dataTabelCheckIns();
        this._isMounted &&
          this.setState({
            kolommenBetaaltransacties: kolommenBetaaltransacties,
            dataTabelBetaaltransacties: dataTabelBetaaltransacties,
            kolommenCheckIns: kolommenCheckIns,
            dataTabelCheckIns: dataTabelCheckIns,
            gegevensInladen: false,
          });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
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
          {evenement && evenement.datumStartEvenement && (
            <div className="margin-rechts">
              <KaartEvenement evenement={evenement} />
            </div>
          )}
          <div>
            {this.genereerTitel("statusH2", "Status", 2)}
            {this.state.inschrijvingsId &&
              this.state.data.datumInschrijving &&
              this.genereerMededeling(
                "inschrijvingsDatum",
                "",
                "Deze inschrijving werd ingediend op " +
                  datumService.getDatumBelgischeNotatie(
                    new Date(this.state.data.datumInschrijving)
                  ) +
                  (this.state.lid && this.state.lid.voornaam !== ""
                    ? " door " +
                      this.state.lid.voornaam +
                      " " +
                      this.state.lid.achternaam +
                      "."
                    : "."),
                "info-sign",
                "Primary"
              )}
            {this.genereerFormulierGroep([
              this.genereerTekstvak(
                "inschrijvingsstatusId",
                "Inschrijvingsstatus",
                "",
                "",
                "flag",
                true,
                false,
                this.state.inschrijvingsstatus.naam
              ),
            ])}
            {(this.state.inschrijvingsstatusIsAangevraagd ||
              this.state.inschrijvingsstatusIsAfgekeurd) &&
              this.genereerFormulierGroep([
                this.genereerTekstveld(
                  "redenAfkeuring",
                  "Reden afkeuring",
                  "",
                  "",
                  "",
                  this.state.inschrijvingsstatusIsAfgekeurd,
                  false
                ),
              ])}
            {this.state.foutmeldingRedenAfkeuring &&
              this.genereerMededeling(
                "foutRedenAfkeuringInvullen",
                "Reden afkeuring invullen",
                "Een inschrijving kan enkel afgekeurd worden afgekeurd wanneer een reden tot afkeuring is opgegeven.",
                "warning-sign",
                "danger"
              )}
            {this.state.foutmeldingStandnummer &&
              this.genereerMededeling(
                "foutStandnummerInvullen",
                "Standnummer invullen",
                "Een inschrijving kan enkel ingepland worden wanneer een standnummer is opgegeven.",
                "warning-sign",
                "danger"
              )}
            {this.state.foutmeldingFormulierNietCorrectIngevuld &&
              this.genereerMededeling(
                "foutFormulierNietCorrectIngevuld",
                "Formulier niet volledig (correct) ingevuld",
                "Het formulier is nog niet volledig (correct) ingevuld. Het veld / de velden die niet (correct) ingevuld zijn zullen een foutmelding bevatten.",
                "warning-sign",
                "danger"
              )}
            {this.state.inschrijvingsstatusIsAangevraagd &&
              this.genereerFormulierGroep([
                this.knopGoedkeuren(),
                this.knopAfkeuren(),
              ])}
            {this.state.inschrijvingsstatusIsGoedgekeurd &&
              this.genereerFormulierGroep([this.knopInplannen()])}
          </div>
          <div>
            {this.genereerTitel("persoonlijkH2", "Persoonlijk", 2)}
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
            {this.genereerTitel("praktischH2", "Praktisch", 2)}
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
              this.genereerTekstvak(
                "standnummer",
                "Standnummer",
                "",
                "",
                "",
                false,
                this.state.inschrijvingsstatusIsGepland
              ),
            ])}
          </div>
          <div>
            {this.genereerTitel("betaalmethodeH2", "Betaalmethode", 2)}
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
                <div className="margin-onder margin-rechts">
                  <Tabel
                    kolommen={this.state.kolommenBetaaltransacties}
                    data={this.state.dataTabelBetaaltransacties}
                    zonderHoofding={false}
                  />
                </div>
              )}
            {this.genereerTitel("checkInH2", "Check-ins", 2)}
            {this.state.checkIns && this.state.checkIns.length > 0 && (
              <div className="margin-onder margin-rechts">
                <Tabel
                  kolommen={this.state.kolommenCheckIns}
                  data={this.state.dataTabelCheckIns}
                  zonderHoofding={false}
                />
              </div>
            )}
            {this.state.data.qrCode &&
              this.genereerFormulierGroep([
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
          {!this.state.inschrijvingsstatusIsAfgekeurd &&
            this.genereerVerzendKnopMetAttributen(
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
  kolommenBetaaltransacties = () => {
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

  dataTabelBetaaltransacties = async () => {
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

  kolommenCheckIns = () => {
    return [
      {
        id: "datumCheckIn",
        naam: "Datum",
        veld: "datum",
        verbergBijSmaller: false,
      },
      {
        id: "tijdCheckIn",
        naam: "Tijd",
        veld: "tijd",
        verbergBijSmaller: false,
      },
      {
        id: "lid",
        naam: "Lid",
        veld: "lid",
        verbergBijSmaller: false,
      },
    ];
  };

  dataTabelCheckIns = async () => {
    const checkIns = [...this.state.checkIns];
    for (let index = 0; index < checkIns.length; index++) {
      const checkIn = checkIns[index];
      checkIn.datum = datumService.getDatumBelgischeNotatie(
        new Date(checkIn.checkInMoment)
      );
      checkIn.tijd = datumService.getTijdstip(new Date(checkIn.checkInMoment));
      const lid = await this.lidInladenZonderStateUpdaten(checkIn.lidId);
      checkIn.lid =
        lid && lid.voornaam !== "" ? lid.voornaam + " " + lid.achternaam : "-";
    }
    return checkIns;
  };

  instellingenInladen = async () => {
    try {
      const {
        data: instellingen,
      } = await instellingenService.getInstellingenAanvraag();
      this._isMounted &&
        this.setState({
          minimumAantalMeter: instellingen.minimumAantalMeter,
        });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  inschrijvingInladen = async () => {
    const { inschrijvingsId } = this.state;
    try {
      const {
        data: inschrijving,
      } = await inschrijvingenService.getInschrijving(inschrijvingsId);
      const prijs = inschrijving.aantalMeter * inschrijving.meterPrijs;
      this._isMounted && this.setState({ data: inschrijving, prijs: prijs });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  evenementInladen = async () => {
    const { evenementId } = this.state.data;
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
      this._isMounted && this.setState({ evenement: evenement });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  betaalmethodenInladen = async () => {
    try {
      const {
        data: betaalmethoden,
      } = await betaalmethodenService.getBetaalmethoden();
      // const verschilInDagen = this.getVerschilInDagen();
      // betaalmethoden.map(
      //   (b) =>
      //     (b.alleenLezen = !betaalmethodenService.isBetaalmethodeNogGeldig(
      //       b,
      //       verschilInDagen
      //     ))
      // );
      this._isMounted && this.setState({ betaalmethoden: betaalmethoden });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  betaalTransactiesInladen = async () => {
    const { inschrijvingsId } = this.state;
    try {
      const {
        data: betaaltransacties,
      } = await betaaltransactiesService.getBetaaltransactiesVanInschrijving(
        inschrijvingsId
      );
      this._isMounted &&
        this.setState({ betaaltransacties: betaaltransacties });
      this.berekenOpenstaandBedrag();
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  checkInsInladen = async () => {
    try {
      const { data: checkIns } = await checkInService.getCheckIns({
        inschrijving: this.state.data.id,
      });
      this._isMounted &&
        this.setState({
          checkIns: checkIns,
        });
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
      const inschrijvingsstatusIsAangevraagd = await this.isInschrijvingsstatusAangevraagd(
        inschrijvingsstatus
      );
      const inschrijvingsstatusIsGoedgekeurd = !inschrijvingsstatusIsAangevraagd
        ? await this.isInschrijvingsstatusGoedgekeurd(inschrijvingsstatus)
        : false;
      const inschrijvingsstatusIsAfgekeurd = !inschrijvingsstatusIsGoedgekeurd
        ? await this.isInschrijvingsstatusAfgekeurd(inschrijvingsstatus)
        : false;
      const inschrijvingsstatusIsGepland = !inschrijvingsstatusIsAfgekeurd
        ? await this.isInschrijvingsstatusGepland(inschrijvingsstatus)
        : false;
      const schema = inschrijvingsstatusIsGepland
        ? this.schemaIngepland
        : this.schema;
      this._isMounted &&
        this.setState({
          inschrijvingsstatus: inschrijvingsstatus,
          inschrijvingsstatusIsAangevraagd: inschrijvingsstatusIsAangevraagd,
          inschrijvingsstatusIsGoedgekeurd: inschrijvingsstatusIsGoedgekeurd,
          inschrijvingsstatusIsAfgekeurd: inschrijvingsstatusIsAfgekeurd,
          inschrijvingsstatusIsGepland: inschrijvingsstatusIsGepland,
          schema: schema,
        });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  isInschrijvingsstatusAangevraagd = async (inschrijvingsstatus) => {
    let huidigeInschrijvingsstatus = inschrijvingsstatus;
    const inschrijvingsstatusAangevraagd = await this.inschrijvingsstatusAangevraagdInladen();
    if (!huidigeInschrijvingsstatus && !huidigeInschrijvingsstatus.id) {
      huidigeInschrijvingsstatus = this.state.inschrijvingsstatus;
    }
    return inschrijvingsstatusAangevraagd.id === huidigeInschrijvingsstatus.id;
  };

  isInschrijvingsstatusGoedgekeurd = async (inschrijvingsstatus) => {
    let huidigeInschrijvingsstatus = inschrijvingsstatus;
    const inschrijvingsstatusGoedgekeurd = await this.inschrijvingsstatusGoedgekeurdInladen();
    if (!huidigeInschrijvingsstatus && !huidigeInschrijvingsstatus.id) {
      huidigeInschrijvingsstatus = this.state.inschrijvingsstatus;
    }
    return inschrijvingsstatusGoedgekeurd.id === huidigeInschrijvingsstatus.id;
  };

  isInschrijvingsstatusAfgekeurd = async (inschrijvingsstatus) => {
    let huidigeInschrijvingsstatus = inschrijvingsstatus;
    const inschrijvingsstatusAfgekeurd = await this.inschrijvingsstatusAfgekeurdInladen();
    if (!huidigeInschrijvingsstatus && !huidigeInschrijvingsstatus.id) {
      huidigeInschrijvingsstatus = this.state.inschrijvingsstatus;
    }
    return inschrijvingsstatusAfgekeurd.id === huidigeInschrijvingsstatus.id;
  };

  isInschrijvingsstatusGepland = async (inschrijvingsstatus) => {
    let huidigeInschrijvingsstatus = inschrijvingsstatus;
    const inschrijvingsstatusGepland = await this.inschrijvingsstatusGeplandInladen();
    if (!huidigeInschrijvingsstatus && !huidigeInschrijvingsstatus.id) {
      huidigeInschrijvingsstatus = this.state.inschrijvingsstatus;
    }
    return inschrijvingsstatusGepland.id === huidigeInschrijvingsstatus.id;
  };

  inschrijvingsstatusAangevraagdInladen = async () => {
    try {
      const {
        data: inschrijvingsstatusAangevraagd,
      } = await inschrijvingsstatusService.getInschrijvingsstatusAangevraagd();
      this._isMounted &&
        this.setState({
          inschrijvingsstatusAangevraagd: inschrijvingsstatusAangevraagd,
        });
      return inschrijvingsstatusAangevraagd;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return undefined;
    }
  };

  inschrijvingsstatusGoedgekeurdInladen = async () => {
    try {
      const {
        data: inschrijvingsstatusGoedgekeurd,
      } = await inschrijvingsstatusService.getInschrijvingsstatusGoedgekeurd();
      this._isMounted &&
        this.setState({
          inschrijvingsstatusGoedgekeurd: inschrijvingsstatusGoedgekeurd,
        });
      return inschrijvingsstatusGoedgekeurd;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return undefined;
    }
  };

  inschrijvingsstatusAfgekeurdInladen = async () => {
    try {
      const {
        data: inschrijvingsstatusAfgekeurd,
      } = await inschrijvingsstatusService.getInschrijvingsstatusAfgekeurd();
      this._isMounted &&
        this.setState({
          inschrijvingsstatusAfgekeurd: inschrijvingsstatusAfgekeurd,
        });
      return inschrijvingsstatusAfgekeurd;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return undefined;
    }
  };

  inschrijvingsstatusGeplandInladen = async () => {
    try {
      const {
        data: inschrijvingsstatusGepland,
      } = await inschrijvingsstatusService.getInschrijvingsstatusGepland();
      this._isMounted &&
        this.setState({
          inschrijvingsstatusGepland: inschrijvingsstatusGepland,
        });
      return inschrijvingsstatusGepland;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return undefined;
    }
  };

  lidInladen = async () => {
    if (this.state.data.lidId && this.state.data.lidId !== "") {
      try {
        const lid = this.lidInladenZonderStateUpdaten(this.state.data.lidId);
        this._isMounted &&
          this.setState({
            lid: lid,
          });
      } catch (error) {}
    }
  };

  lidInladenZonderStateUpdaten = async (lidId) => {
    try {
      const { data: lid } = await ledenService.getLid(lidId);
      return lid;
    } catch (error) {
      return null;
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
      "/inschrijvingen/" + this.state.inschrijvingsId + "/checkin"
    );
  };

  handleWijzigingAantalMeter = (waardeAlsNummer, waardeAlsTekst, invoer) => {
    this.updateData(invoer);

    const { meterPrijs } = this.state.data;
    const prijs = meterPrijs * invoer.value;
    this._isMounted && this.setState({ prijs: prijs });
  };

  handleKlikKnopGoedkeuren = async () => {
    if (this.isFormulierCorrectIngevuld()) {
      let volgendeInschrijvingsstatus = this.state
        .inschrijvingsstatusGoedgekeurd;
      if (!volgendeInschrijvingsstatus || !volgendeInschrijvingsstatus.id) {
        volgendeInschrijvingsstatus = await this.inschrijvingsstatusGoedgekeurdInladen();
      }
      this.inschrijvingWijzigen();
      try {
        await inschrijvingenService.patchInschrijvingGoedkeuren(
          this.state.data.id,
          volgendeInschrijvingsstatus.id
        );
        toaster.infoToastAanmaken("Inschrijving goedgekeurd.");
        setTimeout(async () => {
          await this.inschrijvingInladen();
          await this.inschrijvingsstatusInladen();
        }, 1500);
      } catch (error) {
        responseErrorMeldingService.ToonFoutmeldingVast();
      }
    }
  };

  handleKlikKnopAfkeuren = async () => {
    if (this.isFormulierCorrectIngevuld()) {
      if (
        !this.state.data.redenAfkeuring ||
        (this.state.data.redenAfkeuring &&
          this.state.data.redenAfkeuring.trim() === "")
      ) {
        this._isMounted && this.setState({ foutmeldingRedenAfkeuring: true });
      } else {
        let volgendeInschrijvingsstatus = this.state
          .inschrijvingsstatusAfgekeurd;
        if (!volgendeInschrijvingsstatus || !volgendeInschrijvingsstatus.id) {
          volgendeInschrijvingsstatus = await this.inschrijvingsstatusAfgekeurdInladen();
        }
        this.inschrijvingWijzigen();
        try {
          await inschrijvingenService.patchInschrijvingAfkeuren(
            this.state.data.id,
            volgendeInschrijvingsstatus.id,
            this.state.data.redenAfkeuring
          );
          this._isMounted &&
            this.setState({ foutmeldingRedenAfkeuring: false });
          toaster.infoToastAanmaken("Inschrijving afgekeurd.");
          setTimeout(async () => {
            await this.inschrijvingInladen();
            await this.inschrijvingsstatusInladen();
          }, 1500);
        } catch (error) {
          responseErrorMeldingService.ToonFoutmeldingVast();
        }
      }
    }
  };

  handleKlikKnopInplannen = async () => {
    if (this.isFormulierCorrectIngevuld()) {
      if (
        !this.state.data.standnummer ||
        (this.state.data.standnummer &&
          this.state.data.standnummer.trim() === "")
      ) {
        this._isMounted && this.setState({ foutmeldingStandnummer: true });
      } else {
        let volgendeInschrijvingsstatus = this.state.inschrijvingsstatusGepland;
        if (!volgendeInschrijvingsstatus || !volgendeInschrijvingsstatus.id) {
          volgendeInschrijvingsstatus = await this.inschrijvingsstatusGeplandInladen();
        }
        this.inschrijvingWijzigen();
        try {
          await inschrijvingenService.patchInschrijvingInplannen(
            this.state.data.id,
            volgendeInschrijvingsstatus.id,
            this.state.data.standnummer
          );
          this._isMounted && this.setState({ foutmeldingStandnummer: false });
          toaster.infoToastAanmaken("Inschrijving ingepland.");
          setTimeout(async () => {
            await this.inschrijvingInladen();
            await this.inschrijvingsstatusInladen();
          }, 1500);
        } catch (error) {
          responseErrorMeldingService.ToonFoutmeldingVast();
        }
      }
    }
  };

  // === === === === ===
  // Formulier verwerken
  verzendFormulier = async () => {
    this._isMounted &&
      this.setState({ opdrachtNietVerwerkt: false, opdrachtVerwerken: true });
    const resultaat = await this.inschrijvingWijzigen();
    if (resultaat) {
      this._isMounted && this.setState({ opdrachtVerwerken: false });
      setTimeout(() => {
        this.inschrijvingInladen();
      }, 1500);
      // this.props.history.push("/inschrijvingen/" + this.state.data.id);
    } else {
      this._isMounted &&
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
    const eindePeriode = new Date(this.state.evenement.datumStartEvenement);
    return datumService.getDagenVerschilInPeriode(beginPeriode, eindePeriode);
  };

  berekenOpenstaandBedrag = () => {
    var openstaandBedrag = this.state.prijs;
    this.state.betaaltransacties.map((b) => (openstaandBedrag -= b.bedrag));
    this._isMounted && this.setState({ openstaandBedrag: openstaandBedrag });
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

  knopGoedkeuren = () => {
    return (
      <Knop
        id="goedkeurenKnop"
        inhoud="Goedkeuren"
        intent="success"
        vullen={true}
        onKlik={this.handleKlikKnopGoedkeuren}
      />
    );
  };

  knopAfkeuren = () => {
    return (
      <Knop
        id="afkeurenKnop"
        inhoud="Afkeuren"
        intent="danger"
        vullen={true}
        onKlik={this.handleKlikKnopAfkeuren}
      />
    );
  };

  knopInplannen = () => {
    return (
      <Knop
        id="inplannenKnop"
        inhoud="Inplannen"
        intent="primary"
        vullen={true}
        onKlik={this.handleKlikKnopInplannen}
      />
    );
  };

  isFormulierCorrectIngevuld = () => {
    const errors = this.valideer();
    this._isMounted && this.setState({ errors: errors || {} });
    if (errors) {
      this._isMounted &&
        this.setState({
          errors: errors,
          foutmeldingFormulierNietCorrectIngevuld: true,
        });
      return false;
    }
    return true;
  };
}

export default FormulierinschrijvingWijzigen;
