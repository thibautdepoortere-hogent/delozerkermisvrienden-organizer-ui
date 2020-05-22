import http from "./httpService";

const url = "/betaaltransacties";

// function urlMetId(id) {
//   return `${url}/${id}`;
// }

export function betaaltransactiesOphalen() {
  return http.get(url);
}

export function betaaltransactiesVanInschrijvingOphalen(inschrijvingsId) {
  return http.get(url + "?inschrijving=" + inschrijvingsId);
}

export function betaaltransactieToevoegen(betaaltransactie) {
  return http.post(url, betaaltransactie);
}

// export function betaaltransactieOphalen(betaaltransactieId) {
//   return http.get(urlMetId(betaaltransactieId));
// }

// export function betaaltransactieVerwijderen(betaaltransactiesId) {
//   return http.delete(urlMetId(betaaltransactiesId));
// }
