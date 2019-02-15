import { getBaseUrl, get } from "./utils";

const baseUrl = getBaseUrl("driver");

export async function getDrivers() {
  const response = await get(baseUrl);
  if (response.ok) {
    const drivers = await response.json();
    return drivers;
  }
  const error = await response.json();
  return error;
}
