import {
  getTokenFromLocalStorage,
  clearTokenFromLocalStorage,
} from "../utils/auth";
import { history } from "../App";
export const BASE_URL = "https://api.spotify.com/v1";

export const addQueryParams = (queryParams: {
  [key: string]: string;
}): string => {
  const url = new URLSearchParams();
  Object.entries(queryParams).forEach((param: [string, string]) =>
    url.set(...param)
  );
  return "?" + url.toString();
};

type GET = {
  url: string;
  headers?: { [key: string]: string };
};
export const get = async ({ url, headers = {} }: GET) => {
  const token: string | null = getTokenFromLocalStorage();
  if (!token) {
    history.push("/");
    return { error: true };
  }
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
      ...headers,
    },
  });
  if (response.ok) {
    const parsedResponse = await response.json();
    return parsedResponse;
  } else if (response.status === 401) {
    clearTokenFromLocalStorage();
    history.push("/");
    return { error: true };
  } else {
    return { error: response };
  }
};
