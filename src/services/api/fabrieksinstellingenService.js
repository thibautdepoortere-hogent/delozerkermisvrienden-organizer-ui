import http, { postHeaders } from "./httpService";

const url = "/fabrieksinstellingen";

export function fabrieksinstellingenTerugzetten() {
  const data = "";
  return http.post(url, data, { headers: postHeaders() });
}
