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

const getDagenVerschilInPeriode = (beginPeriode, eindePeriode) => {
  const verschilInMiliseconden =
    Math.abs(eindePeriode) - Math.abs(beginPeriode);
  const verschilInDagen = Math.ceil(
    verschilInMiliseconden / (1000 * 60 * 60 * 24)
  );
  return verschilInDagen;
};

export { getDatumBelgischeNotatie, getDagenVerschilInPeriode };
