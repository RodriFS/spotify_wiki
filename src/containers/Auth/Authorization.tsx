import React from "react";
import { getTokenFromLocalStorage, getRedirectAddress } from "../../utils/auth";
import { History } from "history";

interface Authorization {
  history: History;
}
const Authorization = ({ history }: Authorization) => {
  if (getTokenFromLocalStorage()) {
    history.push("/myLibrary");
    return null;
  }

  return (
    <div className="authorizationPage">
      <div className="welcome_title">
        <div className="welcome">Welcome to:</div>
        <div className="titleLogo">Spotify + Wiki</div>
      </div>
      <div className="redirectBox">
        <a className="redirectLink" href={getRedirectAddress()}>
          Authenticate with Spotify!
        </a>
      </div>
    </div>
  );
};

export default Authorization;
