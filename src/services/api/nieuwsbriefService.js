import http from "./httpService";

const url = "/nieuwsbrieven";

// function urlMetId(id) {
//   return `${url}/${id}`;
// }

// export function evenementenOphalen() {
//   return http.get(url);
// }

// export function evenementOphalen(evenementId) {
//   return http.get(urlMetId(evenementId));
// }

// export function evenementVerwijderen(evenementsId) {
//   return http.delete(urlMetId(evenementsId));
// }

export function nieuwsbriefToevoegen(nieuwsbrief) {
  return http.post(url, nieuwsbrief);
}
