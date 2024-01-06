import axios from "axios";

import { env } from "../constants/env";

export async function fetchAllChurches() {
  const response = await axios.get(env.API_URL + "/api/Church/all");

  return response.data;
}

export async function fetchCityChurches(city) {
  const response = await axios.get(env.API_URL + `/api/Church/s/${city}`);

  return response.data;
}
