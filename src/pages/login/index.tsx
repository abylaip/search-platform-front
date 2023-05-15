import { useLayoutEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const redirectToLogin = async () => {
    const authorizationEndpoint =
      "https://0cc5-178-90-95-197.ngrok-free.app/oauth2/authorize";
    const clientId = "search-platform-client";
    const responseType = "code";
    const scope = "openid";
    const redirectUri = "https://search-platform-front.vercel.app/auth_code";
    const codeChallenge = "Ak_guIA-N5j1wtr-Pm8XpDQcCTCabjylZVWsdXiLq-w";
    const codeChallengeMethod = "S256";

    const loginUrl = `${authorizationEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;

    try {
      window.open(loginUrl);
    } catch (error) {
      console.error(error);
    }
  };
  useLayoutEffect(() => {
    redirectToLogin();
  }, []);
};

export default Login;
function base64url(arg0: any) {
  throw new Error("Function not implemented.");
}
