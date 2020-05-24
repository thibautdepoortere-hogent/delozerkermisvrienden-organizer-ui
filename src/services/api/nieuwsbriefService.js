import http from "./httpService";

const url = "/nieuwsbrieven";

export function postNieuwsbrief(nieuwsbrief) {
  return http.post(url, nieuwsbrief);
}
