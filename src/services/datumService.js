export function getDatumBelgischeNotatie(datum) {
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
}

export function getTijdstip(datum) {
  if (datum) {
    let uren = datum.getHours();
    let minuten = datum.getMinutes();
    let seconden = datum.getSeconds();

    if (uren < 10) {
      uren = "0" + uren;
    }
    if (minuten < 10) {
      minuten = "0" + minuten;
    }
    if (seconden < 10) {
      seconden = "0" + seconden;
    }
    return uren + ":" + minuten + ":" + seconden;
  }
}

export function getDatumVanBelgischeNotatie(datumBelgischeNotatie) {
  const datumZonderSpaties = datumBelgischeNotatie.replace(" ", "");
  const datumGesplitst = datumZonderSpaties.split("/");
  const datumAmerikaanseNotatie =
    datumGesplitst[1] + "/" + datumGesplitst[0] + "/" + datumGesplitst[2];
  const datum = new Date(datumAmerikaanseNotatie);
  if (datum && isNaN(datum.getTime())) {
    return datum;
  }
  return new Date();
}

export function getDagenVerschilInPeriode(beginPeriode, eindePeriode) {
  const verschilInMiliseconden =
    Math.abs(eindePeriode) - Math.abs(beginPeriode);
  const verschilInDagen = Math.ceil(
    verschilInMiliseconden / (1000 * 60 * 60 * 24)
  );
  return verschilInDagen;
}

export function getMinimumDatum(aantalDagenVroeger) {
  const huidigeDatum = new Date();
  const huidigeDatumVerminderd = huidigeDatum;
  huidigeDatumVerminderd.setDate(huidigeDatum.getDate() - aantalDagenVroeger);
  return huidigeDatumVerminderd;
}
