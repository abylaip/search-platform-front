import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { IToken } from "@types";

const AuthCode = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const getAuthTokens = async () => {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", String(router.query.code));
    params.append("redirect_uri", `${window.location.origin}/auth_code`);
    params.append("client_id", "search-platform-client");
    params.append(
      "code_verifier",
      "Gk7tJtkC.W3YGKC0wQc.VALTtAcKesea2DAoa73fKbvNS.7AmJ1rbEo1Q9w9bCx43HFQCRy7tugZM8Y9IWKgbwIs3WRZ3pAsDh.8Wfar3MK-ah~EriVHPB8Vttentctm"
    );
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
        setLoggedIn(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (router.query.code) {
      getAuthTokens();
    }
  }, [router.query]);
  return (
    <div className="w-full flex flex-row justify-center pt-10">
      {loggedIn ? (
        <p className="text-green-500 font-bold">Вы зашли</p>
      ) : (
        <p className="text-red-800 font-bold">Не получилось зайти</p>
      )}
    </div>
  );
};

export default AuthCode;
