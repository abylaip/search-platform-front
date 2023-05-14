import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthCode = () => {
  const router = useRouter();
  const getAuthTokens = async () => {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", String(router.query.code));
    params.append(
      "redirect_uri",
      "https://search-platform-front.vercel.app/auth_code"
    );
    params.append("client_id", "search-platform-client");
    params.append(
      "code_verifier",
      "1bfbb79d1b447eb2fc923f41daacc293dd8a1123ae36520f7e36ec56"
    );
    params.append("scope", "openid");
    params.append("response_type", "code");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/oauth2/token`,
        params,
        {
          auth: {
            username: "search-platform-client",
            password: "search-platform-secret",
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    if (router.query.code) {
      getAuthTokens();
    }
  }, [router.query]);
};

export default AuthCode;
