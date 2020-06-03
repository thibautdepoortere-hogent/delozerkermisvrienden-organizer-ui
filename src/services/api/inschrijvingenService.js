import http, { Headers } from "./httpService";
import * as responseErrorMeldingService from "../api/responseErrorMeldingService";
import * as guidService from "../../services/guidService";

const url = "/inschrijvingen";

function urlMetId(id) {
  return `${url}/${id}`;
}

export async function bestaatInschrijving(inschrijvingsId) {
  const guidInschrijvingsId = guidService.getGuidFormaat(inschrijvingsId);
  if (guidService.isGuid(guidInschrijvingsId)) {
    try {
      await http.head(urlMetId(guidInschrijvingsId) + "/status");
      return true;
    } catch (error) {
      if (error && error.response.status !== 404) {
        responseErrorMeldingService.ToonFoutmeldingVast();
      }
      return false;
    }
  }
}

export function getInschrijvingenViaQrCode(qrCode) {
  return http.get(url + "?qrcode=" + qrCode);
}

export function getInschrijvingenViaFilters(filters) {
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
  parameters += filters.inschrijvingsstatus
    ? "inschrijvingsstatus=" + filters.inschrijvingsstatus + "&"
    : "";
  parameters += filters.nogNietIngecheckt
    ? "nogNietIngecheckt=" + filters.nogNietIngecheckt + "&"
    : "";
  return http.get(url + "?" + parameters);
}

export function getInschrijving(inschrijvingsId) {
  return http.get(urlMetId(inschrijvingsId));
}

export function getInschrijvingVoorStatus(inschrijvingsId) {
  return http.get(urlMetId(inschrijvingsId) + "/status");
}

export function postAanvraag(aanvraag) {
  return http.post(url, aanvraag, { headers: Headers() });
}

export function putInschrijving(inschrijving) {
  return http.put(urlMetId(inschrijving.id), inschrijving);
}

export function patchInschrijvingGoedkeuren(
  inschrijvingsId,
  volgendeInschrijvingsstatusId
) {
  const patchJson = [
    {
      op: "replace",
      path: "/InschrijvingsstatusId",
      value: volgendeInschrijvingsstatusId,
    },
  ];
  return http.patch(urlMetId(inschrijvingsId), patchJson, {
    headers: Headers(),
  });
}

export function patchInschrijvingAfkeuren(
  inschrijvingsId,
  volgendeInschrijvingsstatusId,
  redenAfkeuring
) {
  const patchJson = [
    {
      op: "replace",
      path: "/redenAfkeuring",
      value: redenAfkeuring,
    },
    {
      op: "replace",
      path: "/InschrijvingsstatusId",
      value: volgendeInschrijvingsstatusId,
    },
  ];
  return http.patch(urlMetId(inschrijvingsId), patchJson, {
    headers: Headers(),
  });
}

export function patchInschrijvingInplannen(
  inschrijvingsId,
  volgendeInschrijvingsstatusId,
  standnummer
) {
  const patchJson = [
    {
      op: "replace",
      path: "/standnummer",
      value: standnummer,
    },
    {
      op: "replace",
      path: "/InschrijvingsstatusId",
      value: volgendeInschrijvingsstatusId,
    },
  ];
  return http.patch(urlMetId(inschrijvingsId), patchJson, {
    headers: Headers(),
  });
}
