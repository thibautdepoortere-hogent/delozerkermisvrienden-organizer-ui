import http from "./httpService";
import * as responseErrorMeldingService from "../api/responseErrorMeldingService";
import * as guidService from "../../services/guidService";

const url = "/inschrijvingen";

function urlMetId(id) {
  return `${url}/${id}`;
}

export async function bestaatInschrijving(inschrijvingsId) {
  if (guidService.isGuid(inschrijvingsId)) {
    try {
      await http.head(urlMetId(inschrijvingsId));
      return true;
    } catch (error) {
      if (error && error.response.status === 404) {
        // niet gevonden
      } else {
        responseErrorMeldingService.ToonFoutmelding(
          error,
          "Er is een fout opgetreden bij het inladen van het evenement."
        );
      }
      return false;
    }
  }
}

export function inschrijvingenOphalen() {
  return http.get(url);
}

export function inschrijvingenViaQrCodeOphalen(qrCode) {
  return http.get(url + "?qrcode=" + qrCode);
}

export function inschrijvingenViaFiltersOphalen(filters) {
  let parameters = "";
  parameters += filters.voornaam ? "voornaam=" + filters.voornaam + "&" : "";
  parameters += filters.achternaam
    ? "achternaam=" + filters.achternaam + "&"
    : "";
  parameters += filters.standnummer
    ? "standnummer=" + filters.standnummer + "&"
    : "";
  parameters += filters.inschrijvingsnummer
    ? "id=" + filters.inschrijvingsnummer + "&"
    : "";
  return http.get(url + "?" + parameters);
}

export function inschrijvingOphalen(inschrijvingsId) {
  return http.get(urlMetId(inschrijvingsId));
}

export function inschrijvingVerwijderen(inschrijvingsId) {
  return http.delete(urlMetId(inschrijvingsId));
}

export function inschrijvingUpdaten(inschrijving) {
  return http.put(urlMetId(inschrijving.id), inschrijving);
}

export function aanvraagIndienen(aanvraag) {
  return http.post(url, aanvraag);
}

export async function controleInschrijvingsId(inschrijvingsId) {
  const guid = guidService.getGuidFormaat(inschrijvingsId);
  if (!(await this.bestaatInschrijving(guid))) {
    return "";
  } else {
    return guid;
  }
}
