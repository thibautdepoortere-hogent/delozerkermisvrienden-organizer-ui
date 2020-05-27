import http from "./httpService";

const url = "/leden";

function urlMetId(id) {
  return `${url}/${id}`;
}

export function getLid(lidId) {
  return http.get(urlMetId(lidId));
}
