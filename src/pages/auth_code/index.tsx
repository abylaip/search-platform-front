import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthCode = () => {
  const router = useRouter();
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
          mode: "no-cors",
          headers: {
            "Content-Type": "application/url-form-encoded",
            Authorization: `Basic c2VhcmNoLXBsYXRmb3JtLWNsaWVudDpzZWFyY2gtcGxhdGZvcm0tc2VjcmV0`,
          },
          body: params,
        }
      );
      if (response.ok) {
        console.log(response.json());
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
};

export default AuthCode;
