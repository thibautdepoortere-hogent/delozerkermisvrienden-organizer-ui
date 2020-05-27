import bcrypt from "bcryptjs";
import jwtDecode from "jwt-decode";
import http, { Headers } from "./httpService";
import * as toaster from "../../services/toasterService";

const localStorageTokenNaam = "token";
const url = "/authenticatie";
const salt = "$2a$12$HB6ha21ETrzefxodR5H.t.";

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

export function handleTokenOpgehaald(tokenObject) {
  const token = tokenObject && tokenObject.token;
  if (token !== "") {
    localStorage.setItem(localStorageTokenNaam, tokenObject.token);
    return true;
  }
}

export function getToken() {
  const token = localStorage.getItem(localStorageTokenNaam);
  return token;
}

export function getActieveGebruiker() {
  try {
    const token = getToken();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function getActieveGebruikersId() {
  const gebruiker = getActieveGebruiker();
  if (gebruiker) {
    if (gebruiker.role === "Standhouder") {
      return gebruiker
        ? gebruiker.nameid !== ""
          ? gebruiker.nameid
          : "geenid"
        : "geengebruiker";
    } else if (gebruiker.role === "Administrator") {
      return gebruiker.nameid;
    }
  }
  return "";
}

export function getActieveGebruikersRol() {
  const gebruiker = getActieveGebruiker();
  return gebruiker && gebruiker.role !== "" ? gebruiker.role : "";
}

export function handleLogUit() {
  localStorage.removeItem(localStorageTokenNaam);
}

export function heeftActieveGebruikerToegang(toegelatenRollen) {
  const actieveGebruikersRol = getActieveGebruikersRol();
  if (actieveGebruikersRol && actieveGebruikersRol !== "") {
    for (let index = 0; index < toegelatenRollen.length; index++) {
      const toegelatenRol = toegelatenRollen[index];
      if (actieveGebruikersRol === toegelatenRol) {
        return true;
      }
    }
  }
}

export function hashWachtwoord(
  wachtwoordIngegevenDoorGebruiker,
  onHashedWachtwoord
) {
  bcrypt.hash(wachtwoordIngegevenDoorGebruiker, salt, function (err, hash) {
    if (err) {
      toaster.errorToastAanmaken(err);
    }
    onHashedWachtwoord(hash);
  });
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
