import { useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface FetchDataResponse<T> {
  data: T | null;
  error: any | null;
  isLoading: boolean;
}

export const useMutation = <T = unknown>(
  url: string
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

      axios
        .put<T>(url, payload, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((response) => {
          setRes({ data: response.data, isLoading: false, error: null });
        })
        .catch((error) => {
          setRes({ data: null, isLoading: false, error });
        });
    },
    [url, access_token]
  );

  return [res, callAPI];
};
