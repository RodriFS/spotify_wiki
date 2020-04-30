const TOKEN_STORAGE_KEY = "spotify_wiki_token";

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
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token) {
    return null;
  }
  return token;
};

export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearTokenFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getRedirectAddress = (): string => {
  const query = new URLSearchParams();
  query.set("client_id", "0a2086bcc3f54865929ad90b4d7bd7ea");
  query.set("response_type", "token");
  query.set("redirect_uri", "https://spotify-wiki.herokuapp.com/authorized");
  query.set("state", "lksndlaksjdnmalsdnkajsnd");
  query.set("scope", "user-library-read");
  return "https://accounts.spotify.com/authorize?" + query.toString();
};
