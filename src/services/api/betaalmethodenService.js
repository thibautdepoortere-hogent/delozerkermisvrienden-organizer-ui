import http from "./httpService";

const url = "/betaalmethoden";

export function betaalmethodenOphalen() {
  return http.get(url);
}
