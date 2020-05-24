import bcrypt from "bcryptjs";
import http, { Headers } from "./httpService";
import * as toaster from "../../services/toasterService";

const url = "/authenticatie";
// const salt = "(rmv#yy}/<eIHOQczV%{{QbhyH3=ff";

export function authenticeerStandhouder(data) {
  return http.post(url + "/standhouder", data, { headers: Headers() });
}

export function authenticeerAdministrator(data) {
  return http.post(url + "/administrator", data, { headers: Headers() });
}

export function authenticeerAdministratorEmail(email) {
  return http.post(
    url + "/administrator/email",
    { email: email },
    { headers: Headers() }
  );
}

export function controleerWachtwoord(
  wachtwoordIngegevenDoorGebruiker,
  hashedWachtwoord,
  onControleUitgevoerd
) {
  bcrypt.compare(wachtwoordIngegevenDoorGebruiker, hashedWachtwoord, function (
    err,
    result
  ) {
    if (err) {
      toaster.errorToastAanmaken(err);
    }
    onControleUitgevoerd({ result, hashedWachtwoord });
  });
}
