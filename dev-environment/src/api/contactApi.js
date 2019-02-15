import { post } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/contact/";

export function saveContactUs(contact) {
  return post(baseUrl, contact);
}
