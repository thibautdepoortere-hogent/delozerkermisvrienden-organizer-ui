const getDatumBelgischeNotatie = (datum) => {
  if (datum) {
    const dag = datum.getDate();
    const maand = datum.getMonth() + 1;
    const jaar = datum.getFullYear();
    return (
      (dag > 9 ? dag : "0" + dag) +
      "/" +
      (maand > 9 ? maand : "0" + maand) +
      "/" +
      jaar
    );
  }
};

const getDatumVanBelgischeNotatie = (datumBelgischeNotatie) => {
  const datumZonderSpaties = datumBelgischeNotatie.replace(" ", "");
  const datumGesplitst = datumZonderSpaties.split("/");
  // var dag = "";
  // var maand = "";
  // var jaar = "";
  // dag =
  //   datumGesplitst[0] &&
  //   datumGesplitst[0] > 0 &&
  //   datumGesplitst[0] <= 31 &&
  //   datumGesplitst[0];
  const datumAmerikaanseNotatie =
    datumGesplitst[1] + "/" + datumGesplitst[0] + "/" + datumGesplitst[2];
  const datum = new Date(datumAmerikaanseNotatie);
  if (datum && isNaN(datum.getTime())) {
    return datum;
  }
  return new Date();
};

const getDagenVerschilInPeriode = (beginPeriode, eindePeriode) => {
  const verschilInMiliseconden =
    Math.abs(eindePeriode) - Math.abs(beginPeriode);
  const verschilInDagen = Math.ceil(
    verschilInMiliseconden / (1000 * 60 * 60 * 24)
  );
  return verschilInDagen;
};

const getMinimumDatum = (aantalDagenVroeger) => {
  const huidigeDatum = new Date();
  const huidigeDatumVerminderd = huidigeDatum;
  huidigeDatumVerminderd.setDate(huidigeDatum.getDate() - aantalDagenVroeger);
  return huidigeDatumVerminderd;
};

export {
  getDatumBelgischeNotatie,
  getDagenVerschilInPeriode,
  getDatumVanBelgischeNotatie,
  getMinimumDatum,
};
