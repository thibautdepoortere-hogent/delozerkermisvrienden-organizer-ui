import React from "react";
import Tabel from "./tabel";
import * as datumService from "../../../services/datumService";

const TabelInschrijvingEigenschappen = ({ inschrijving }) => {
  return (
    <Tabel
      kolommen={kolommen()}
      data={data(inschrijving)}
      zonderHoofding={true}
    />
  );
};

const kolommen = () => {
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

const data = (inschrijving) => {
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
    { id: "id", eigenschap: "Inschrijvingsnummer", waarde: inschrijving.id },
  ];
};

export default TabelInschrijvingEigenschappen;
