import http from "./httpService";

const url = "/evenementen";

function urlMetId(id) {
  return `${url}/${id}`;
}

export function evenementenOphalen() {
  return http.get(url);
}

export function evenementOphalen(evenementId) {
  return http.get(urlMetId(evenementId));
}

export function evenementVerwijderen(evenementsId) {
  return http.delete(urlMetId(evenementsId));
}
