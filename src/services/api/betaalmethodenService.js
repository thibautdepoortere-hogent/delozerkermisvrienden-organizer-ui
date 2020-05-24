import http from "./httpService";

const url = "/betaalmethoden";

function urlMetId(id) {
  return `${url}/${id}`;
}

export function getBetaalmethoden() {
  return http.get(url);
}

export function getBetaalmethode(betaalmethodeId) {
  return http.get(urlMetId(betaalmethodeId));
}

export function getBetaalmethodeOverschrijving() {
  return http.get(url + "/overschrijving");
}

export function isBetaalmethodeNogGeldig(betaalmethode, verschilInDagen) {
  if (verschilInDagen >= betaalmethode.aantalDagenVroegerAfsluiten) {
    return true;
  }
}
