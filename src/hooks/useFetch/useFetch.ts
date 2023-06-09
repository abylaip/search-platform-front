import Cookies from "js-cookie";
import { useReducer, useEffect, useRef } from "react";

interface State<T> {
  data?: T;
  error?: Error;
}

interface Conditions {
  data?: number;
  flag?: boolean;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit,
  conditions?: Conditions
): State<T> {
  const cache = useRef<Cache<T>>({});
  const access_token = Cookies.get("access_token");

  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(
          url,
          options || {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
      }
    };

    if (
      conditions?.flag &&
      (conditions.data !== undefined || conditions.data !== null)
    ) {
      void fetchData();
    }

    if (typeof conditions === "undefined") {
      void fetchData();
    }

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
}
