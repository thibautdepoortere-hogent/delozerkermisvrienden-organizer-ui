import http, { Headers } from "./httpService";

const url = "/betaaltransacties";

export function getBetaaltransactiesVanInschrijving(inschrijvingsId) {
  return http.get(url + "?inschrijving=" + inschrijvingsId);
}

export function postBetaaltransactie(betaaltransactie) {
  return http.post(url, betaaltransactie, { headers: Headers() });
}

// export function betaaltransactieOphalen(betaaltransactieId) {
//   return http.get(urlMetId(betaaltransactieId));
// }

// export function betaaltransactieVerwijderen(betaaltransactiesId) {
//   return http.delete(urlMetId(betaaltransactiesId));
// }
