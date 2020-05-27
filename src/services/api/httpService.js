import axios from "axios";
import * as toaster from "../toasterService";
import * as logService from "../logService";

const localStorageTokenNaam = "token";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem(localStorageTokenNaam);

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logService.LogFoutmelding(error);
    logService.LogFout(error);
    console.log("Mijn error: ", error);
    toaster.errorToastAanmaken("Er is een onverwachte fout opgetreden.");
  }
  return Promise.reject(error);
});

export function Headers() {
  return { "Content-Type": "application/json", Accepts: "application/json" };
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  head: axios.head,
};
