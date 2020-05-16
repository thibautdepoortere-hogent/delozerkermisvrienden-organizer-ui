const getDatumBelgischeNotatie = (datum) => {
  return (
    datum.getDate() + "/" + (datum.getMonth() + 1) + "/" + datum.getFullYear()
  );
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
