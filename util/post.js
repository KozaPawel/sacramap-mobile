import axios from "axios";

import { env } from "../constants/env";

export async function addVisitedChurch(churchId, userToken) {
  const response = await axios.post(
    env.API_URL + `/api/Visitation/${churchId}/user/add`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
}
