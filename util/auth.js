import axios from "axios";

import { env } from "../constants/env";

export async function register(email, password) {
  await axios.post(env.API_URL + "/register", {
    email: email,
    password: password,
  });
}

export async function login(email, password) {
  const response = await axios.post(env.API_URL + "/login", {
    email: email,
    password: password,
  });

  return response.data;
}
