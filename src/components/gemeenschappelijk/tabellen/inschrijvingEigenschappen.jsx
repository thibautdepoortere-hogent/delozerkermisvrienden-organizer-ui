import React from "react";
import Tabel from "./tabel";
import * as responseErrorMeldingService from "../../../services/api/responseErrorMeldingService";
import * as inschrijvingsstatusService from "../../../services/api/inschrijvingsstatusService";

const TabelInschrijvingEigenschappen = ({ inschrijving }) => {
  return (
    <Tabel
      kolommen={kolommen()}
      data={data(inschrijving)}
      zonderHoofding={true}
    />
  );
};

// === === === === ===
// Inladen
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
    {
      id: "status",
      eigenschap: "Status",
      waarde: naamInschrijvingsstatus(inschrijving.inschrijvingsstatusId),
    },
    { id: "id", eigenschap: "Inschrijvingsnummer", waarde: inschrijving.id },
  ];
};

// === === === === ===
// Helpers
const naamInschrijvingsstatus = async (inschrijvingsstatusId) => {
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

export default TabelInschrijvingEigenschappen;
