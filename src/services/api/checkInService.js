import http, { Headers } from "./httpService";

const url = "/checkins";

// function urlMetId(id) {
//   return `${url}/${id}`;
// }

export function getCheckIns(filters) {
  let parameters = "";
  parameters += filters.inschrijving
    ? "inschrijving=" + filters.inschrijving + "&"
    : "";
  parameters += filters.lid ? "lid=" + filters.lid + "&" : "";
  parameters += filters.checkInMomentStartPeriode
    ? "checkInMomentStartPeriode=" + filters.checkInMomentStartPeriode + "&"
    : "";
  parameters += filters.checkInMomentEindPeriode
    ? "checkInMomentEindPeriode=" + filters.checkInMomentEindPeriode + "&"
    : "";
  return http.get(url + "?" + parameters);
}

export function postCheckIn(data) {
  return http.post(url, data, { headers: Headers() });
}
