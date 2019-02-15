import axios from "axios";

export async function post(url, data, config = {}) {
  return axios.post(url, data, config).catch(handleError);
}

export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  // TODO: Call an error logging service.
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
