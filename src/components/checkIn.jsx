import React from "react";
import Basis from "./gemeenschappelijk/basis";
import Tabel from "./gemeenschappelijk/tabellen/tabel";
import * as inschrijvingenService from "../services/api/inschrijvingenService";
import * as evenementenService from "../services/api/evenementenService";
import * as betaaltransactiesService from "../services/api/betaaltransactiesService";
import * as inschrijvingsstatusService from "../services/api/inschrijvingsstatusService";
import * as checkInService from "../services/api/checkInService";
import * as responseErrorMeldingService from "../services/api/responseErrorMeldingService";
import ProgressBarInladenGegevens from "./gemeenschappelijk/progressBarInladenGegevens";
import * as authenticatieService from "../services/api/authenticatieService";
import Knop from "./gemeenschappelijk/knop";

class CheckIn extends Basis {
  _isMounted = false;
  state = {
    data: { voornaam: "", achternaam: "" },
    evenement: { id: "", naam: "" },
    inschrijvingsstatus: { id: "", naam: "" },
    inschrijvingsstatusIsAangevraagd: false,
    inschrijvingsstatusIsAfgekeurd: false,
    betaaltransacties: [],
    checkIns: [],
    prijs: 0,
    openstaandBedrag: 0,
    aantalCheckIns: 0,
    kolommen: [],
    dataTabel: [],
    gegevensInladen: false,
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
      this.setState({ gegevensInladen: true });
      const inschrijvingsId = this.props.match.params.inschrijvingsId;
      if (!(await inschrijvingenService.bestaatInschrijving(inschrijvingsId))) {
        this.props.history.push("/not-found");
      } else {
        this._isMounted && this.setState({ inschrijvingsId: inschrijvingsId });
        await this.inschrijvingInladen();
        await this.evenementInladen();
        await this.betaalTransactiesInladen();
        await this.checkInsInladen();
        await this.inschrijvingsstatusInladen();
        this._isMounted &&
          this.setState({
            kolommen: this.kolommen(),
            dataTabel: this.dataTabel(),
            gegevensInladen: false,
          });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        {this.state.gegevensInladen && <ProgressBarInladenGegevens />}
        {this.genereerTitel("checkInH1", "Check-In", 1)}
        {this.genereerFormulierGroep([
          <Knop
            id="checkIn"
            inhoud="Check-in"
            intent="success"
            vullen={true}
            onKlik={this.handleKlikCheckIn}
          />,
          <Knop
            id="details"
            inhoud="Details"
            intent="primary"
            vullen={true}
            onKlik={this.handleKlikDetails}
          />,
        ])}
        {this.genereerMededeling(
          "naam",
          "Naam",
          this.state.data.voornaam + " " + this.state.data.achternaam,
          "person"
        )}
        {this.genereerMededeling(
          "inschrijvingsstatus",
          "Inschrijvingsstatus",
          this.state.inschrijvingsstatus.naam,
          "flag",
          this.state.inschrijvingsstatusIsAangevraagd ||
            this.state.inschrijvingsstatusIsAfgekeurd
            ? "Danger"
            : "Success"
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
        {this.genereerMededeling(
          "standnummer",
          "Standnummer",
          this.state.data.standnummer || "-",
          "numerical",
          "Primary"
        )}
        {this.genereerMededeling(
          "checkIns",
          "Aantal check-ins",
          this.state.aantalCheckIns,
          "endorsed"
        )}
        <Tabel
          kolommen={this.state.kolommen}
          data={this.state.dataTabel}
          zonderHoofding={false}
        />
      </div>
    );
  }

  // === === === === ===
  // Inladen
  kolommen = () => {
    return [
      {
        id: "eigenschap",
        naam: "Eigenschap",
        veld: "eigenschap",
        verbergBijSmaller: false,
      },
      {
        id: "waarde",
        naam: "Waarde",
        veld: "waarde",
        verbergBijSmaller: false,
      },
    ];
  };

  dataTabel = () => {
    const data = [
      {
        id: "aantalMeter",
        eigenschap: "Aantal meter",
        waarde: this.state.data.aantalMeter,
      },
      {
        id: "aangalWagens",
        eigenschap: "Aantal wagens",
        waarde: this.state.data.aantalWagens,
      },
      {
        id: "aantalAanhangwagens",
        eigenschap: "Aantal aanhangwagens",
        waarde: this.state.data.aantalAanhangwagens,
      },
      {
        id: "aantalMobilhomes",
        eigenschap: "Aantal mobilhomes",
        waarde: this.state.data.aantalMobilhomes,
      },
      {
        id: "opmerking",
        eigenschap: "Opmerking",
        waarde: this.state.data.opmerking,
      },
    ];
    return data;
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
      this._isMounted && this.setState({ evenement: evenement });
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
      const inschrijvingsstatusIsAfgekeurd = await this.isInschrijvingsstatusAfgekeurd(
        inschrijvingsstatus
      );
      this._isMounted &&
        this.setState({
          inschrijvingsstatus: inschrijvingsstatus,
          inschrijvingsstatusIsAangevraagd: inschrijvingsstatusIsAangevraagd,
          inschrijvingsstatusIsAfgekeurd: inschrijvingsstatusIsAfgekeurd,
        });
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };

  checkInsInladen = async () => {
    try {
      const { data: checkIns } = await checkInService.getCheckIns({
        inschrijving: this.state.data.id,
      });
      const aantalCheckIns = checkIns ? checkIns.length : 0;
      this._isMounted &&
        this.setState({
          checkIns: checkIns,
          aantalCheckIns: aantalCheckIns,
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

  isInschrijvingsstatusAfgekeurd = async (inschrijvingsstatus) => {
    let huidigeInschrijvingsstatus = inschrijvingsstatus;
    const inschrijvingsstatusAfgekeurd = await this.inschrijvingsstatusAfgekeurdInladen();
    if (!huidigeInschrijvingsstatus && !huidigeInschrijvingsstatus.id) {
      huidigeInschrijvingsstatus = this.state.inschrijvingsstatus;
    }
    return inschrijvingsstatusAfgekeurd.id === huidigeInschrijvingsstatus.id;
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

  // === === === === ===
  // Evenementen
  handleKlikCheckIn = async () => {
    try {
      await checkInService.postCheckIn({
        inschrijvingsId: this.state.inschrijvingsId,
        lidId: authenticatieService.getActieveGebruikersId(),
      });
      this.props.history.push("/inschrijvingen/opzoeken");
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
      return undefined;
    }
  };

  handleKlikDetails = () => {
    this.state.inschrijvingsId &&
      this.state.inschrijvingsId !== "" &&
      this.props.history.push("/inschrijvingen/" + this.state.inschrijvingsId);
  };

  // === === === === ===
  // Acties
  inschrijvingInchecken = () => {};

  // === === === === ===
  // Helpers
  berekenOpenstaandBedrag = () => {
    var openstaandBedrag = this.state.prijs;
    this.state.betaaltransacties.map((b) => (openstaandBedrag -= b.bedrag));
    this._isMounted && this.setState({ openstaandBedrag: openstaandBedrag });
  };
}

export default CheckIn;
