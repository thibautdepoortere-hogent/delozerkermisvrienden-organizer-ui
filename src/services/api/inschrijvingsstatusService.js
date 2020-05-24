import http from "./httpService";

const url = "/inschrijvingsstatussen";

function urlMetId(id) {
  return `${url}/${id}`;
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
