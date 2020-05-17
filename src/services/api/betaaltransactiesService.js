import http from "./httpService";

const url = "/betaaltransacties";

// function urlMetId(id) {
//   return `${url}/${id}`;
// }

export function betaaltransactiesOphalen() {
  return http.get(url);
}

export function betaaltransactiesVanInschrijvingOphalen(inschrijvingsId) {
  return http.get(url + "?inschrijving=" + inschrijvingsId);
}

export function getGeformateerdeGestructureerdeMededeling(
  gestructureerdeMededeling
) {
  if (gestructureerdeMededeling.length === 12) {
    return (
      "+++ " +
      gestructureerdeMededeling.substr(0, 3) +
      " / " +
      gestructureerdeMededeling.substr(3, 4) +
      " / " +
      gestructureerdeMededeling.substr(7, 5) +
      " +++"
    );
  }
}

// export function betaaltransactieOphalen(betaaltransactieId) {
//   return http.get(urlMetId(betaaltransactieId));
// }

// export function betaaltransactieVerwijderen(betaaltransactiesId) {
//   return http.delete(urlMetId(betaaltransactiesId));
// }
