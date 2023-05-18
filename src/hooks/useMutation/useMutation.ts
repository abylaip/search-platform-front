import { useState, useCallback } from "react";
import axios, { Method } from "axios";
import Cookies from "js-cookie";

interface FetchDataResponse<T> {
  data: T | null;
  error: any | null;
  isLoading: boolean;
}

export const useMutation = <T = unknown>(
  url: string,
  method: Method = "PUT"
): [FetchDataResponse<T>, (payload: any) => void] => {
  const [res, setRes] = useState<FetchDataResponse<T>>({
    data: null,
    error: null,
    isLoading: false,
  });
  const access_token = Cookies.get("access_token");

  const callAPI = useCallback(
    (payload: any) => {
      setRes((prevState) => ({ ...prevState, isLoading: true }));

      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      const requestMethod = method.toLowerCase() as Method;

      axios
        .request<T>({ url, method: requestMethod, data: payload, ...config })
        .then((response) => {
          setRes({ data: response.data, isLoading: false, error: null });
        })
        .catch((error) => {
          setRes({ data: null, isLoading: false, error });
        });
    },
    [url, method, access_token]
  );

  return [res, callAPI];
};
