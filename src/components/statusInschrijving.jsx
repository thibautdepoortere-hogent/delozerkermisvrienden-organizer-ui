import React, { Component } from "react";
import Basis from "./gemeenschappelijk/basis";
import * as formatteerService from "../services/formatteerService";
import * as apiService from "../services/api/apiService";
import * as inschrijvingenService from "../services/api/inschrijvingenService";

class StatusInschrijving extends Basis {
  state = {
    errors: {},
    data: {},
    prijs: 0,
    betaalmethode: { id: "", naam: "" },
    betaalmethodeOverschrijving: {},
    inschrijvingsstatus: { id: "", naam: "" },
  };

  async componentDidMount() {
    await this.inschrijvingInladen();
  }

  render() {
    return (
      <div>
        {this.genereerTitel("statusInschrijvingH1", "Status inschrijving")}
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
          {this.genereerTitel("persoonlijkH2", "Persoonlijk", "", undefined, 2)}
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
            this.genereerTekstvak("postcode", "Postcode", "", "", "home", true),
            this.genereerTekstvak("gemeente", "Gemeente", "", "", "home", true),
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
            this.genereerTekstvak("email", "E-mail", "", "", "envelope", true),
          ])}
        </div>
        <div>
          {this.genereerTitel("praktischH2", "Praktisch", "", undefined, 2)}
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
            this.genereerTekstveld("opmerking", "Opmerking", "", "", "", true),
          ])}
        </div>
        <div>
          {this.genereerTitel(
            "betaalmethodeH2",
            "Betaalmethode",
            "",
            undefined,
            2
          )}
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
    );
  }

  inschrijvingInladen = async () => {
    console.log("Start");
    const result = await apiService.apiCallUitvoeren(
      inschrijvingenService.inschrijvingOphalen,
      ["bfebd9b2-7c28-446a-9483-a281550212ec"],
      "Inschrijving ingeladen.",
      "Inschrijving kan momenteel niet ingeladen worden.",
      true,
      this.onInschrijvingenIngeladen
    );
  };

  onInschrijvingenIngeladen = (inschrijving) => {
    this.setState({ data: inschrijving });
  };

  gestructureerdeMededelingWeergeven = (
    betaalmethodeId,
    betaalmethodeOverschrijvingId
  ) => {
    if (betaalmethodeId === betaalmethodeOverschrijvingId) {
      return true;
    }
  };
}

export default StatusInschrijving;
