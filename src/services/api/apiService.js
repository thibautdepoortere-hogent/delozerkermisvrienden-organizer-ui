import * as responseErrorMeldingService from "./responseErrorMeldingService";
import * as toaster from "../toasterService";

export async function apiCallUitvoeren(
  apiFunctie,
  apiFunctieParameters,
  meldingIndienOk,
  meldingIndienFout,
  foutcodeWeergevenInFout,
  callbackOnOk,
  callbackOnFout
) {
  var resultaat = false;
  switch (apiFunctieParameters.length) {
    case 1:
      return await apiCallUitvoerenAantalParameters1(
        apiFunctie,
        apiFunctieParameters[0],
        meldingIndienOk,
        meldingIndienFout,
        foutcodeWeergevenInFout,
        callbackOnOk,
        callbackOnFout
      );
    case 2:
      return await apiCallUitvoerenAantalParameters2(
        apiFunctie,
        apiFunctieParameters[0],
        apiFunctieParameters[1],
        meldingIndienOk,
        meldingIndienFout,
        foutcodeWeergevenInFout,
        callbackOnOk,
        callbackOnFout
      );
    default:
      console.log("Meer dan 2 parameters");
      return undefined;
  }
}

async function apiCallUitvoerenAantalParameters1(
  apiFunctie,
  apiFunctieParameter,
  meldingIndienOk,
  meldingIndienFout,
  foutcodeWeergevenInFout,
  callbackOnOk,
  callbackOnFout
) {
  try {
    const { data: response } = await apiFunctie(apiFunctieParameter);
    meldingOkTonen(meldingIndienOk);
    callbackOnOk(response);
    return true;
  } catch (error) {
    meldingFoutTonen(meldingIndienFout, error, foutcodeWeergevenInFout);
    callbackOnFout();
    return false;
  }
}

async function apiCallUitvoerenAantalParameters2(
  apiFunctie,
  apiFunctieParameter1,
  apiFunctieParameter2,
  meldingIndienOk,
  meldingIndienFout,
  foutcodeWeergevenInFout,
  callbackOnOk,
  callbackOnFout
) {
  try {
    const { data: response } = await apiFunctie(
      apiFunctieParameter1,
      apiFunctieParameter2
    );
    meldingOkTonen(meldingIndienOk);
    callbackOnOk(response);
    return true;
  } catch (error) {
    meldingFoutTonen(meldingIndienFout, error, foutcodeWeergevenInFout);
    callbackOnFout();
    return false;
  }
}

function meldingOkTonen(meldingIndienOk) {
  meldingIndienOk && toaster.infoToastAanmaken(meldingIndienOk);
}

function meldingFoutTonen(meldingIndienFout, error, foutcodeWeergevenInFout) {
  meldingIndienFout &&
    responseErrorMeldingService.ToonFoutmelding(
      error,
      foutcodeWeergevenInFout,
      meldingIndienFout
    );
}
