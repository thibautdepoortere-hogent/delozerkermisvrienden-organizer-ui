import http from "./httpService";

const url = "/inschrijvingsstatussen";

function urlMetId(id) {
  return `${url}/${id}`;
}

export function getInschrijvingsstatussen() {
  return http.get(url);
}

export function getInschrijvingsstatus(inschrijvingsstatusId) {
  return http.get(urlMetId(inschrijvingsstatusId));
}

export function getInschrijvingsstatusAangevraagd() {
  return http.get(urlMetId("aangevraagd"));
}

export function getInschrijvingsstatusGoedgekeurd() {
  return http.get(urlMetId("goedgekeurd"));
}

export function getInschrijvingsstatusAfgekeurd() {
  return http.get(urlMetId("afgekeurd"));
}

export function getInschrijvingsstatusGepland() {
  return http.get(urlMetId("gepland"));
}

export function getInschrijvingsstatusViaFilter(inschrijvingsstatusFilter) {
  switch (inschrijvingsstatusFilter) {
    case "aangevraagd":
      return getInschrijvingsstatusAangevraagd();
    case "goedgekeurd":
      return getInschrijvingsstatusGoedgekeurd();
    case "afgekeurd":
      return getInschrijvingsstatusAfgekeurd();
    case "gepland":
      return getInschrijvingsstatusGepland();
    case "":
    default:
      return getInschrijvingsstatussen();
  }
}

export function getInschrijvingsstatusTitelViaFilter(
  inschrijvingsstatusFilter
) {
  switch (inschrijvingsstatusFilter) {
    case "aangevraagd":
      return "Openstaande aanvragen";
    case "goedgekeurd":
      return "Goedgekeurde inschrijvingen";
    case "afgekeurd":
      return "Afgekeurde inschrijvingen";
    case "gepland":
      return "Ingeplande inschrijvingen";
    case "":
    default:
      return "Alle inschrijvingen";
  }
}
