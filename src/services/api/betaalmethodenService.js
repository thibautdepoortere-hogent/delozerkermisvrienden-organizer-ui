import http from "./httpService";
import * as datumService from "../datumService";

const url = "/betaalmethoden";

export function betaalmethodenOphalen() {
  return http.get(url);
}

export function betaalmethodeOverschrijving() {
  return http.get(url + "/overschrijving");
}

export function isBetaalmethodeNogGeldig(betaalmethode, verschilInDagen) {
  if (verschilInDagen >= betaalmethode.aantalDagenVroegerAfsluiten) {
    return true;
  }
}
