import React, { Component } from "react";
import Tabel from "./tabel";
import * as responseErrorMeldingService from "../../../services/api/responseErrorMeldingService";
import * as inschrijvingsstatusService from "../../../services/api/inschrijvingsstatusService";

class TabelInschrijvingEigenschappen extends Component {
  _isMounted = false;

  state = { kolommen: [], data: [] };

  async componentDidMount() {
    this._isMounted = true;
    const { inschrijving } = this.props;
    if (inschrijving && inschrijving.inschrijvingsstatusId) {
      const kolommen = this.kolommen();
      const data = await this.data(inschrijving);
      this._isMounted && this.setState({ kolommen: kolommen, data: data });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Tabel
        kolommen={this.state.kolommen}
        data={this.state.data}
        zonderHoofding={true}
      />
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

  data = async (inschrijving) => {
    return [
      {
        id: "aantalMeter",
        eigenschap: "Aantal meter",
        waarde: inschrijving.aantalMeter,
      },
      {
        id: "standnummer",
        eigenschap: "Standnummer",
        waarde: inschrijving.standnummer ? inschrijving.standnummer : "-",
      },
      {
        id: "status",
        eigenschap: "Status",
        waarde: await this.naamInschrijvingsstatus(
          inschrijving.inschrijvingsstatusId
        ),
      },
      { id: "id", eigenschap: "Inschrijvingsnummer", waarde: inschrijving.id },
    ];
  };

  // === === === === ===
  // Helpers
  naamInschrijvingsstatus = async (inschrijvingsstatusId) => {
    try {
      const {
        data: inschrijvingsstatus,
      } = await inschrijvingsstatusService.getInschrijvingsstatus(
        inschrijvingsstatusId
      );
      return inschrijvingsstatus
        ? inschrijvingsstatus.naam
        : inschrijvingsstatusId;
    } catch (error) {
      responseErrorMeldingService.ToonFoutmeldingVast();
    }
  };
}

export default TabelInschrijvingEigenschappen;
