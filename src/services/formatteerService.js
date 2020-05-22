//import Moment from "moment";

const formatteerCell = (cellInhoud, formateerMethode) => {
  switch (formateerMethode) {
    case "datum":
      return formatteerDatum(cellInhoud);
    case "telefoon":
      return formatteerTelefoon(cellInhoud);
    default:
      return cellInhoud;
  }
};

const formatteerDatum = (cellInhoud) => {
  return cellInhoud;
  //return Moment(cellInhoud).format("DD/MM/YYYY");
};

const formatteerTelefoon = (cellInhoud) => {
  const locatieSpatie = cellInhoud.search(" ");
  if (locatieSpatie >= 0) {
    const preFix = cellInhoud.substring(0, locatieSpatie);
    const mobielNummer = cellInhoud.substring(locatieSpatie + 1);
    const lengteMobielNummer = mobielNummer.length;
    switch (lengteMobielNummer) {
      case 8:
        return (
          preFix +
          " " +
          mobielNummer.substring(0, 1) +
          " " +
          mobielNummer.substring(1, 4) +
          " " +
          mobielNummer.substring(4, 6) +
          " " +
          mobielNummer.substring(6, 8)
        );
      case 9:
        return (
          preFix +
          " " +
          mobielNummer.substring(0, 1) +
          " " +
          mobielNummer.substring(1, 3) +
          " " +
          mobielNummer.substring(3, 5) +
          " " +
          mobielNummer.substring(5, 7) +
          " " +
          mobielNummer.substring(7, 9)
        );
      default:
        return cellInhoud;
    }
  } else {
    return cellInhoud;
  }
};

const getGeformateerdeGestructureerdeMededeling = (
  gestructureerdeMededeling
) => {
  let g = "";
  if (gestructureerdeMededeling.length > 0) {
    g =
      g +
      "+++ " +
      gestructureerdeMededeling.substr(
        0,
        gestructureerdeMededeling.length > 3
          ? 3
          : gestructureerdeMededeling.length
      );
  }

  if (gestructureerdeMededeling.length > 3) {
    g =
      g +
      " / " +
      gestructureerdeMededeling.substr(
        3,
        gestructureerdeMededeling.length > 7
          ? 4
          : gestructureerdeMededeling.length - 3
      );
  }

  if (gestructureerdeMededeling.length > 7) {
    g =
      g +
      " / " +
      gestructureerdeMededeling.substr(
        3,
        gestructureerdeMededeling.length > 12
          ? 5
          : gestructureerdeMededeling.length - 7
      );
  }

  if (gestructureerdeMededeling.length >= 12) {
    g = g + " +++";
  }
  return g;
};

export { formatteerCell, getGeformateerdeGestructureerdeMededeling };
