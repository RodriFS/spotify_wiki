import React from "react";
import { getTokenFromLocalStorage } from "../../utils/auth";

const Authorization = ({ history }: any) => {
  if (getTokenFromLocalStorage()) {
    history.push("/myLibrary");
    return null;
  }
  const query = new URLSearchParams();
  query.set("client_id", "0a2086bcc3f54865929ad90b4d7bd7ea");
  query.set("response_type", "token");
  query.set("redirect_uri", "http://localhost:3000/authorized");
  query.set("state", "lksndlaksjdnmalsdnkajsnd");
  query.set("scope", "user-library-read");
  const redirect = "https://accounts.spotify.com/authorize?" + query.toString();

  return <a href={redirect}>Authenticate!</a>;
};

export default Authorization;
