import React, { Component } from "react";
import TabelHoofding from "./tabelHoofding";
import TabelInhoud from "./tabelInhoud";

class Tabel extends Component {
  render() {
    const { kolommen, data } = this.props;
    return (
      <table className="bp3-html-table bp3-html-table-striped">
        <TabelHoofding kolommen={kolommen} />
        <TabelInhoud kolommen={kolommen} data={data} />
      </table>
    );
  }
}

export default Tabel;
