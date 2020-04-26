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
