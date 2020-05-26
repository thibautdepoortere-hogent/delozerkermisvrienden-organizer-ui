import http, { Headers } from "./httpService";

const url = "/nieuwsbrieven";

export function postNieuwsbrief(nieuwsbrief) {
  return http.post(url, nieuwsbrief, { headers: Headers() });
}
