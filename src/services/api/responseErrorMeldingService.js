import * as toaster from "../../services/toasterService";

export function ToonFoutmelding(error, foutmelding400) {
  if (error.response) {
    if (error.response.status === 400) {
      toaster.errorToastAanmaken("400 - " + foutmelding400);
    } else {
      toaster.errorToastAanmaken(
        error.response.status + " - " + error.response[["data"]]
      );
    }
  }
}
