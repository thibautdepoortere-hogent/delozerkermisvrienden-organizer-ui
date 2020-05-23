import React, { Component } from "react";
import TabelHoofding from "./tabelHoofding";
import TabelInhoud from "./tabelInhoud";

class Tabel extends Component {
  render() {
    const { kolommen, data: rijen, zonderHoofding } = this.props;
    return (
      <table className="bp3-html-table bp3-html-table-striped tabel-100-procent">
        {!zonderHoofding && <TabelHoofding kolommen={kolommen} />}
        <TabelInhoud kolommen={kolommen} rijen={rijen} />
      </table>
    );
  }
}

export default Tabel;
