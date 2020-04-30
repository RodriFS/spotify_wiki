export interface ErrorResponse {
  error: boolean;
}

export const isErrorResponse = <T extends object>(
  response: T | ErrorResponse
): response is ErrorResponse => {
  return response.hasOwnProperty("error");
};
