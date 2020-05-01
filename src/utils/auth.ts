import {
  STORAGE_KEY,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_STATE,
  SPOTIFY_AUTH_URL,
  SPOTIFY_SCOPE,
} from "../constants/config";

export const getTokenFromHash = (hash: string) => {
  return hash
    .substring(1)
    .split("&")
    .reduce(function (acc: string | null, item) {
      if (item.startsWith("access_token")) {
        acc = item.replace("access_token=", "");
      }
      return acc;
    }, null);
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem(STORAGE_KEY);
  if (!token) {
    return null;
  }
  return token;
};

export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem(STORAGE_KEY, token);
};

export const clearTokenFromLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getRedirectAddress = (): string => {
  const query = new URLSearchParams();
  query.set("client_id", SPOTIFY_CLIENT_ID);
  query.set("response_type", "token");
  query.set("redirect_uri", SPOTIFY_REDIRECT_URI);
  query.set("state", SPOTIFY_STATE);
  query.set("scope", SPOTIFY_SCOPE);
  return SPOTIFY_AUTH_URL + query.toString();
};
