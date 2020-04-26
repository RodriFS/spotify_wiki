import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getTokenFromHash, setTokenInLocalStorage } from "../../utils/auth";

const Authorized = () => {
  let history = useHistory();

  const getTokens = () => {
    const token = getTokenFromHash(window.location.hash);
    window.location.hash = "";
    if (!token) {
      history.push("/");
      return;
    }
    setTokenInLocalStorage(token);
    history.push("/myLibrary");
  };

  useEffect(getTokens, []);
  return null;
};

export default Authorized;
