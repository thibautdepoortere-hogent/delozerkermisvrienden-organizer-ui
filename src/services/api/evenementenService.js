import http from "./httpService";

const url = "/evenementen";

function urlMetId(id) {
  return `${url}/${id}`;
}

export function getEvenementen() {
  return http.get(url);
}

export function getEvenement(evenementId) {
  return http.get(urlMetId(evenementId));
}
