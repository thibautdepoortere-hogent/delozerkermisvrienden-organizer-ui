import http from "./httpService";

const url = "/inschrijvingsstatussen";

function urlMetId(id) {
  return `${url}/${id}`;
}

export function inschrijvingsstatussenOphalen() {
  return http.get(url);
}

export function inschrijvingsstatusOphalen(inschrijvingsstatusId) {
  return http.get(urlMetId(inschrijvingsstatusId));
}

export function inschrijvingsstatusVerwijderen(inschrijvingsstatusId) {
  return http.delete(urlMetId(inschrijvingsstatusId));
}
