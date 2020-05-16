import http from "./httpService";

const url = "/instellingen";

export function instellingenAanvraagOphalen() {
  return http.get(url + "/aanvraag");
}
