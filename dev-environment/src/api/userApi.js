import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/users/";

export function getUser(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}
