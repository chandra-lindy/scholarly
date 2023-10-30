import { Auth } from "aws-amplify";
import axios from "axios";
import { HTTP_BACKEND_URL } from "./constants.js";
import { WS_BACKEND_URL } from "./constants.js";

export async function fetchCurrentUser() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (err) {
    console.log("User not authenticated", err);
    return null;
  }
}

export async function fetchToken() {
  try {
    const user = fetchCurrentUser();
    const jwtToken = user.signInUserSession.idToken.jwtToken;
    return jwtToken;
  } catch (err) {
    console.log("User not authenticated", err);
    return null;
  }
}

export async function getResponse(payload) {
  const token = await fetchToken();
  if (token) {
    try {
      const response = await axios.post(
        `ws:${HTTP_BACKEND_URL}/chat`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}

export async function getSocket() {
  const user = await fetchCurrentUser();
  const user_name = user.username;
  const socket = new WebSocket(`${WS_BACKEND_URL}/ws/${user_name}`);

  return socket;
}
