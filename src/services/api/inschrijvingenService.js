import http from "./httpService";
import * as responseErrorMeldingService from "../api/responseErrorMeldingService";

const url = "/inschrijvingen";

function urlMetId(id) {
  return `${url}/${id}`;
}

export async function bestaatInschrijving(inschrijvingsId) {
  try {
    await http.head(urlMetId(inschrijvingsId));
    return true;
  } catch (error) {
    if (error.response !== "404") {
      responseErrorMeldingService.ToonFoutmelding(
        error,
        "Er is een fout opgetreden bij het inladen van de inschrijving."
      );
    }
    return false;
  }
}

export function inschrijvingenOphalen() {
  return http.get(url);
}

export function inschrijvingOphalen(inschrijvingsId) {
  return http.get(urlMetId(inschrijvingsId));
}

export function inschrijvingVerwijderen(inschrijvingsId) {
  return http.delete(urlMetId(inschrijvingsId));
}

export function aanvraagIndienen(aanvraag) {
  return http.post(url, aanvraag);
}
