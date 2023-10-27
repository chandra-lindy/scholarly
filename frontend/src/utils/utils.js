import { Auth } from "aws-amplify";
import axios from "axios";
import { BACKEND_URL } from "utils/constants.js";

export async function fetchUserAndToken() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const jwtToken = user.signInUserSession.idToken.jwtToken;
    console.log("JWT Token: ", jwtToken);
    return jwtToken;
  } catch (err) {
    console.log("User not authenticated", err);
    return null;
  }
}

export async function getResponse(payload) {
  const token = await fetchUserAndToken();
  if (token) {
    try {
      const response = await axios.post(`${BACKEND_URL}/chat`, payload, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}
