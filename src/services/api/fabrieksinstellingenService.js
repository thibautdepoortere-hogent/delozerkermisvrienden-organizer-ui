import http, { Headers } from "./httpService";

const url = "/fabrieksinstellingen";

export function fabrieksinstellingenTerugzetten() {
  const data = "";
  return http.post(url, data, { headers: Headers() });
}
