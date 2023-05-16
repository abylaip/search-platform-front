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
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer eyJ4NXQjUzI1NiI6ImxBN0hmWk1IQXRzcXhqTEhsdjRUSFNySVJYM1BYcXMyQ0U4dDM1VFpjWUEiLCJraWQiOiJzZWFyY2gtcGxhdGZvcm0iLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODIiLCJzdWIiOiJzZWFyY2gtcGxhdGZvcm0tY2xpZW50IiwiYXVkIjoic2VhcmNoLXBsYXRmb3JtLWNsaWVudCIsIm5iZiI6MTY4NDI0OTg2OSwiZXhwIjoxNjg0MjUwNzY5LCJpYXQiOjE2ODQyNDk4Njl9.je9BwGqzrPr-I5idajcO3aFM6WV9aeMpnhZOIXeskqwLOxbuOlRlDOMqp-kZxy8pWS1hcAvAF2i_nORcam8nc8_9KYqxHM_KmiY3t0V88DQJGOYEzSdCEQ3r61pJcd91BeJMBxTHSlvzjB13HX5vRTOEUq7EnQlANUUItDCLfdEsu_dWsEhhOxXcBU_Ly-fyTi4KL-6wAMxdnTjiRgvcvZMOz5YsMLkRi892XlKHSd2L7fy7GDCCDz0ZFlNs0pLxPmUupa8SdNN_jyEcgZORPMiJ9A05rFyVBFrGyxucPNBJXSnHDDl_w8HLbqp8hPDyB4ZH2ctZw7B-HDMnOEM1bQ`,
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
