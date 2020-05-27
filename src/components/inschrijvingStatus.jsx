import React from "react";
import PrintProvider, { Print } from "react-easy-print";
import Basis from "./gemeenschappelijk/basis";
import ProgressBarInladenGegevens from "./gemeenschappelijk/progressBarInladenGegevens";
import * as formatteerService from "../services/formatteerService";
import * as responseErrorMeldingService from "../services/api/responseErrorMeldingService";
import * as inschrijvingenService from "../services/api/inschrijvingenService";
import * as inschrijvingsstatusService from "../services/api/inschrijvingsstatusService";
import * as betaalmethodenService from "../services/api/betaalmethodenService";
import AanvraagIngediend from "./aanvraagIngediend";
import * as authenticatieService from "../services/api/authenticatieService";

class InschrijvingStatus extends Basis {
  _isMounted = false;

  state = {
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
      betaalmethodeId: "",
      gestructureerdeMededeling: "",
      qrCode: "",
      redenAfkeuring: "",
      inschrijvingsstatusId: "",
      evenementId: "",
      datumInschrijving: "",
    },
    prijs: 0,
    betaalmethode: { id: "", naam: "" },
    betaalmethodeOverschrijving: {},
    inschrijvingsstatus: { id: "", naam: "" },
    gegevensInladen: false,
    aanvraagIngediendTonen: false,
  };

  async componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({ gegevensInladen: true });
    const id = authenticatieService.getActieveGebruikersId();
    const rol = authenticatieService.getActieveGebruikersRol();
    const inschrijvingsId = this.props.match.params.inschrijvingsId;
    if (
      id === "" ||
      id === "geenid" ||
      id === "geengebruiker" ||
      (rol !== "Administrator" && id !== inschrijvingsId)
    ) {
      this.props.history.push(
        "/authenticatie/standhouder" +
          (inschrijvingsId !== "" &&
          inschrijvingsId !== "geenid" &&
          inschrijvingsId !== "geengebruiker"
            ? "/" + inschrijvingsId
            : "")
      );
    } else if (
      !authenticatieService.heeftActieveGebruikerToegang([
        "Standhouder",
        "Administrator",
      ])
    ) {
      this.props.history.push("/geentoegang");
    } else {
      const aanvraagIngediend = this.props.match.params.aanvraagIngediend;
      if (
        inschrijvingsId !== "geenid" &&
        !(await inschrijvingenService.bestaatInschrijving(inschrijvingsId))
      ) {
        this.props.history.push("/not-found");
      } else {
        if (aanvraagIngediend) {
          this._isMounted && this.setState({ aanvraagIngediendTonen: true });
        }
        await this.inschrijvingInladen(inschrijvingsId);
        await this.inschrijvingsstatusInladen();
        await this.betaalmethodeInladen();
        this._isMounted && this.setState({ gegevensInladen: false });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <PrintProvider>
          <div>
            {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
            <Print single printOnly name="status">
              <div>
                {this.genereerTitel("blancoTitelH1Print", "", 1)}
                {this.genereerTitel(
                  "statusInschrijvingH1Print",
                  "Status inschrijving",
                  1
                )}
                {this.genereerFormulierGroep([
                  this.genereerTekstvak(
                    "idPrint",
                    "Inschrijvingsnummer",
                    "",
                    "",
                    "tag",
                    false
                  ),
                ])}
                {this.genereerFormulierGroep([
                  this.genereerTekstvak(
                    "inschrijvingsstatusIdPrint",
                    "Inschrijvingsstatus",
                    "",
                    "",
                    "flag",
                    false,
                    false,
                    this.state.inschrijvingsstatus.naam
                  ),
                ])}
                {this.state.data.redenAfkeuring &&
                  this.genereerFormulierGroep([
                    this.genereerTekstveld(
                      "redenAfkeuringPrint",
                      "Reden afkeuring",
                      "",
                      "",
                      "",
                      false
                    ),
                  ])}
                {this.genereerFormulierGroep([
                  this.genereerTekstvak(
                    "voornaamPrint",
                    "Voornaam",
                    "",
                    "",
                    "person",
                    false
                  ),
                ])}
                {this.genereerFormulierGroep([
                  this.genereerTekstvak(
                    "achternaamPrint",
                    "Achternaam",
                    "",
                    "",
                    "person",
                    false
                  ),
                ])}
                {this.genereerFormulierGroep([
                  this.genereerTekstvak(
                    "aantalMeterPrint",
                    "Aantal meter",
                    "",
                    "",
                    "",
                    false
                  ),
                ])}
                {this.genereerFormulierGroep([
                  this.genereerTekstvak(
                    "prijsPrint",
                    "Prijs (€)",
                    "",
                    "",
                    "",
                    false,
                    false,
                    this.state.prijs
                  ),
                ])}
                {this.state.data.qrCode &&
                  this.genereerQrCode(this.state.data.qrCode)}
                {!this.state.data.qrCode &&
                  this.genereerMededeling(
                    "qrCodeNietAanwezigPrint",
                    "",
                    "De QR Code wordt pas gegenereerd wanneer uw aanvraag is goedgekeurd.",
                    "info-sign",
                    "primary"
                  )}
              </div>
            </Print>

            {this.state.aanvraagIngediendTonen && (
              <AanvraagIngediend
                inschrijvingsId="c1dea00c-0513-4ebf-8c01-306c6533a270"
                {...this.props.history}
              />
            )}
            {this.genereerTitel(
              "statusInschrijvingH1",
              "Status inschrijving",
              1
            )}
            <div>
              {this.genereerFormulierGroep([
                this.genereerTekstvak(
                  "id",
                  "Inschrijvingsnummer",
                  "",
                  "",
                  "tag",
                  true
                ),
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
              {this.state.data.redenAfkeuring &&
                this.genereerFormulierGroep([
                  this.genereerTekstveld(
                    "redenAfkeuring",
                    "Reden afkeuring",
                    "",
                    "",
                    "",
                    true
                  ),
                ])}
              {this.state.data.qrCode &&
                this.genereerQrCode(this.state.data.qrCode)}
              {!this.state.data.qrCode &&
                this.genereerMededeling(
                  "qrCodeNietAanwezig",
                  "",
                  "De QR Code wordt pas gegenereerd wanneer uw aanvraag is goedgekeurd.",
                  "info-sign",
                  "primary"
                )}
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
                  true
                ),
                this.genereerTekstvak(
                  "achternaam",
                  "Achternaam",
                  "",
                  "",
                  "person",
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
                  true
                ),
                this.genereerTekstvak(
                  "gemeente",
                  "Gemeente",
                  "",
                  "",
                  "home",
                  true
                ),
              ])}
              {this.genereerFormulierGroep([
                this.genereerMobielNummer(
                  "prefixMobielNummer",
                  "mobielNummer",
                  "",
                  true
                ),
              ])}
              {this.genereerFormulierGroep([
                this.genereerTekstvak(
                  "email",
                  "E-mail",
                  "",
                  "",
                  "envelope",
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
                  undefined,
                  undefined,
                  true
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
                  this.state.prijs
                ),
              ])}
              {this.genereerFormulierGroep([
                this.genereerNumeriekVak(
                  "aantalWagens",
                  "Aantal wagens",
                  "",
                  "",
                  undefined,
                  undefined,
                  true
                ),
                this.genereerNumeriekVak(
                  "aantalAanhangwagens",
                  "Aantal aanhangwagens",
                  "",
                  "",
                  undefined,
                  undefined,
                  true
                ),
                this.genereerNumeriekVak(
                  "aantalMobilhomes",
                  "Aantal mobilhomes",
                  "",
                  "",
                  undefined,
                  undefined,
                  true
                ),
              ])}
              {this.genereerMededeling(
                "aantalVoertuigenTijdensPlannen",
                "",
                "Bij het plannen van de standen zal er zoveel mogelijk rekening gehouden worden met de ingegeven voertuigen." +
                  " Let wel, mogelijks kunnen niet àlle ingevulde voertuigen aan de stand staan.",
                "info-sign",
                "Primary"
              )}
              {this.genereerFormulierGroep([
                this.genereerTekstveld(
                  "opmerking",
                  "Opmerking",
                  "",
                  "",
                  "",
                  true
                ),
              ])}
            </div>
            <div>
              {this.genereerTitel("betaalmethodeH2", "Betaalmethode", 2)}
              {this.genereerFormulierGroep([
                this.genereerTekstvak(
                  "betaalmethodeId",
                  "Betaalmethode",
                  "",
                  "",
                  "",
                  true,
                  false,
                  this.state.betaalmethode.naam
                ),
              ])}
              {this.gestructureerdeMededelingWeergeven(
                this.state.data.betaalmethodeId,
                this.state.betaalmethodeOverschrijving.id
              ) &&
                this.state.data.gestructureerdeMededeling &&
                this.genereerFormulierGroep([
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
              {this.gestructureerdeMededelingWeergeven(
                this.state.data.betaalmethodeId,
                this.state.betaalmethodeOverschrijving.id
              ) &&
                !this.state.data.gestructureerdeMededeling &&
                this.genereerMededeling(
                  "gestructureerdeMededelingNietAanwezig",
                  "",
                  "De gestructureerde mededeling wordt pas gegenereerd wanneer uw aanvraag is goedgekeurd.",
                  "info-sign",
                  "primary"
                )}
            </div>
          </div>
        </PrintProvider>
      </div>
    );
  }

  // === === === === ===
  // Inladen
  inschrijvingInladen = async (inschrijvingsId) => {
    try {
      const {
        data: inschrijving,
      } = await inschrijvingenService.getInschrijvingVoorStatus(
        inschrijvingsId
      );
      const prijs = inschrijving.aantalMeter * inschrijving.meterPrijs;
      this._isMounted && this.setState({ data: inschrijving, prijs: prijs });
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
      this._isMounted &&
        this.setState({ inschrijvingsstatus: inschrijvingsstatus });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  betaalmethodeInladen = async () => {
    try {
      const {
        data: betaalmethode,
      } = await betaalmethodenService.getBetaalmethode(
        this.state.data.betaalmethodeId
      );
      this._isMounted && this.setState({ betaalmethode: betaalmethode });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  // === === === === ===
  // Events

  // === === === === ===
  // Helpers
  gestructureerdeMededelingWeergeven = (
    betaalmethodeId,
    betaalmethodeOverschrijvingId
  ) => {
    if (betaalmethodeId === betaalmethodeOverschrijvingId) {
      return true;
    }
  };
}

export default InschrijvingStatus;
