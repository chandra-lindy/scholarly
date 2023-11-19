import { Auth } from "aws-amplify";
import { HTTP_BACKEND_URL } from "./constants.js";
import { WS_BACKEND_URL } from "./constants.js";
import axios from "axios";

export async function fetchCurrentUser() {
  console.log("fetching current user");
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (err) {
    console.error("User not authenticated", err);
    return null;
  }
}

export async function fetchToken() {
  try {
    const user = await fetchCurrentUser();
    const jwtToken = user.signInUserSession.idToken.jwtToken;
    return jwtToken;
  } catch (err) {
    console.error("User not authenticated", err);
    return null;
  }
}

export async function getSocket(book_title) {
  console.log("getting socket");
  const user = await fetchCurrentUser();
  const user_name = user.username;
  const encoded_book_title = encodeURIComponent(book_title);
  console.log("book_title: ", book_title);
  console.log("encoded_book_title: ", encoded_book_title);
  console.log("user_name: ", user_name);
  console.log(
    "url: ",
    `${WS_BACKEND_URL}/ws/${user_name}/${encoded_book_title}`
  );
  const socket = new WebSocket(
    `${WS_BACKEND_URL}/ws/${user_name}/${encoded_book_title}`
  );

  return socket;
}

export async function getBookList() {
  const token = await fetchToken();
  try {
    const response = await axios.get(`${HTTP_BACKEND_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response.data: ", response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching book list", err);
  }
}

export async function uploadFile(data) {
  const token = await fetchToken();
  try {
    const response = await axios.post(`${HTTP_BACKEND_URL}/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const message = await response.data;
    return message;
  } catch (err) {
    console.error("Error uploading file", err);
  }
}

export async function getBook(book_title) {
  console.log("getting book");
  const token = await fetchToken();
  console.log("book_title: ", book_title);
  const encoded_book_title = encodeURIComponent(book_title);
  try {
    const response = await axios.get(
      `${HTTP_BACKEND_URL}/book/${encoded_book_title}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error fetching book", err);
  }
}
