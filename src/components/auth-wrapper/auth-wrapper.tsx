import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { IToken } from "@types";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const refresh_token = Cookies.get("refresh_token");
  const getAuthTokens = async () => {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("redirect_uri", `${window.location.origin}/auth_code`);
    params.append("client_id", "search-platform-client");
    params.append("refresh_token", refresh_token || "");
    params.append("scope", "openid");
    params.append("response_type", "code");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/oauth2/token`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic c2VhcmNoLXBsYXRmb3JtLWNsaWVudDpzZWFyY2gtcGxhdGZvcm0tc2VjcmV0`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        }
      );
      if (response.ok) {
        const data: IToken = await response.json();
        Cookies.set("access_token", data.access_token, {
          expires: data.expires_in,
        });
        Cookies.set("refresh_token", data.refresh_token);
        setTimeout(() => {
          router.push("/");
        }, 1000);
        console.log("page refreshed");
      } else {
        console.error("Request failed with status:", response.status);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };
  useEffect(() => {
    if (!Cookies.get("access_token") && !Cookies.get("refresh_token")) {
      router.push("/login");
    } else if (!Cookies.get("access_token") && Cookies.get("refresh_token")) {
      getAuthTokens();
    }
  }, [router.pathname]);
  return <>{children}</>;
};
