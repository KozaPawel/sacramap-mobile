import axios from "axios";

import { env } from "../constants/env";

export async function fetchChurches(email, password) {
  const response = await axios.get(env.API_URL + "/api/Church/all");

  return response.data;
}
