import {
  getTokenFromLocalStorage,
  clearTokenFromLocalStorage,
} from "../utils/auth";
import { history } from "../App";
import { ErrorResponse } from "../typings/request";
export const BASE_URL = "https://api.spotify.com/v1";

export const addQueryParams = <T extends object>(queryParams: T): string => {
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
export const get = async ({
  url,
  headers = {},
}: GET): Promise<any | ErrorResponse> => {
  const errorResponse: ErrorResponse = { error: true };
  const token: string | null = getTokenFromLocalStorage();
  if (!token) {
    history.push("/");
    return errorResponse;
  }
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
      ...headers,
    },
  });
  if (response.ok) {
    const parsedResponse: unknown = await response.json();
    return parsedResponse;
  } else if (response.status === 401) {
    clearTokenFromLocalStorage();
    history.push("/");
    return errorResponse;
  } else {
    return errorResponse;
  }
};
