import http from "./httpService";

const url = "/inschrijvingen";

function urlMetId(id) {
  return `${url}/${id}`;
}

export function inschrijvingenOphalen() {
  return http.get(url);
}

export function inschrijvingVerwijderen(inschrijvingsId) {
  return http.delete(urlMetId(inschrijvingsId));
}