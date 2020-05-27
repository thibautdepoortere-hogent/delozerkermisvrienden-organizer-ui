import http from "./httpService";

const url = "/checkins";

// function urlMetId(id) {
//   return `${url}/${id}`;
// }

export function getCheckIns(filters) {
  console.log("Filters: ", filters);
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
  console.log("Parameters: ", parameters);
  return http.get(url + "?" + parameters);
}

//Inschrijving
