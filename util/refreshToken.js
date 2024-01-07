import axios from "axios";

import { env } from "../constants/env";

export async function refreshToken(storedToken) {
  const response = await axios.post(env.API_URL + "/refresh", {
    refreshToken: storedToken,
  });

  return response.data;
}
