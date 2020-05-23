import * as toaster from "../../services/toasterService";

export function ToonFoutmelding(error, errorCodeWeergeven, foutmeldingInhoud) {
  error &&
    error.response &&
    error.response.status &&
    toaster.errorToastAanmaken(
      (errorCodeWeergeven && error.response.status + " - ") +
        (foutmeldingInhoud ? foutmeldingInhoud : error.response[["data"]])
    );

  !error && foutmeldingInhoud && toaster.errorToastAanmaken(foutmeldingInhoud);
}
