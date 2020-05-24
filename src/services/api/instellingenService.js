import http from "./httpService";

const url = "/instellingen";

export function getInstellingenAanvraag() {
  return http.get(url + "/aanvraag");
}
