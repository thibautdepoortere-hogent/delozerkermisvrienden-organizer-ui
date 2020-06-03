const connecteerInDevlopmentNaarLiveApi = true;
const liveApi =
  "https://delozerkermisvrienden-organizer-api.azurewebsites.net/api";

const prod = {
  REACT_APP_API_URL: liveApi,
};
const dev = {
  REACT_APP_API_URL: connecteerInDevlopmentNaarLiveApi
    ? liveApi
    : "http://localhost:65000/api",
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
