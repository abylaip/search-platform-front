import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { IToken } from "@types";
import { Header } from "..";
import jwtDecode from "jwt-decode";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 15);
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
          expires,
        });
        Cookies.set("refresh_token", data.refresh_token);
        await router.push("/");
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log(error);
      await router.push("/auth_code");
    }
  };
  useEffect(() => {
    if (access_token) {
      const token: any = jwtDecode(access_token);
      localStorage.setItem("user_id", token.id);
    }
    if (
      !Cookies.get("access_token") &&
      !Cookies.get("refresh_token") &&
      router.pathname !== "/auth_code"
    ) {
      router.push("/login");
    } else if (!Cookies.get("access_token") && Cookies.get("refresh_token")) {
      getAuthTokens();
    } else {
      setIsAuth(true);
    }
  }, [router.pathname]);
  return (
    <>
      <Header isAuth={isAuth} />
      {children}
    </>
  );
};
