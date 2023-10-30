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

export async function getSocket() {
  const user = await fetchCurrentUser();
  const user_name = user.username;
  console.log(`Connecting to ${WS_BACKEND_URL}/ws/${user_name}`);
  const socket = new WebSocket(`${WS_BACKEND_URL}/ws/${user_name}`);

  return socket;
}
