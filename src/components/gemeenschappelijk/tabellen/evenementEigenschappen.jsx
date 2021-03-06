import React, { Component } from "react";
import Tabel from "./tabel";
import * as datumService from "../../../services/datumService";

class TabelEvenementEigenschappen extends Component {
  _isMounted = false;

  state = { kolommen: [], data: [] };

  async componentDidMount() {
    this._isMounted = true;
    const { evenement } = this.props;
    if (evenement && evenement.id) {
      const kolommen = this.kolommen();
      const data = await this.data(evenement);
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

  data = async (evenement) => {
    return [
      {
        id: "datumStartEvenement",
        eigenschap: "Datum start evenement",
        waarde: evenement.datumStartEvenement
          ? datumService.getDatumBelgischeNotatie(evenement.datumStartEvenement)
          : "",
      },
      // {
      //   id: "datumEindEvenement",
      //   eigenschap: "Datum einde evenement",
      //   waarde: evenement.datumEindeEvenement
      //     ? datumService.getDatumBelgischeNotatie(evenement.datumEindeEvenement)
      //     : "",
      // },
      // {
      //   id: "datumStartInschrijvingen",
      //   eigenschap: "Datum start inschrijvingen",
      //   waarde: evenement.datumStartInschrijvingen
      //     ? datumService.getDatumBelgischeNotatie(
      //         evenement.datumStartInschrijvingen
      //       )
      //     : "",
      // },
      // {
      //   id: "datumEindeInschrijvingen",
      //   eigenschap: "Datum einde inschrijvingen",
      //   waarde: evenement.datumEindeInschrijvingen
      //     ? datumService.getDatumBelgischeNotatie(
      //         evenement.datumEindeInschrijvingen
      //       )
      //     : "",
      // },
    ];
  };

  // === === === === ===
  // Helpers
}

export default TabelEvenementEigenschappen;
