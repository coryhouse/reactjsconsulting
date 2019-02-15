import { getBaseUrl, get } from "./utils";

const baseUrl = getBaseUrl("vehicle/schedule");

export async function getVehicles() {
  const response = await get(baseUrl);
  if (response.ok) {
    const vehicles = await response.json();
    return vehicles;
  }
  const error = await response.json();
  return error;
}
