import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/accounts/";

export function getAccount(accountId) {
  return fetch(baseUrl + accountId)
    .then(handleResponse)
    .catch(handleError);
}
