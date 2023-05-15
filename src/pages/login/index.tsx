import { useLayoutEffect } from "react";

const Login = () => {
  const redirectToLogin = async () => {
    const authorizationEndpoint =
      "https://0cc5-178-90-95-197.ngrok-free.app/oauth2/authorize";
    const clientId = "search-platform-client";
    const responseType = "code";
    const scope = "openid";
    const redirectUri = "https://search-platform-front.vercel.app/auth_code";
    const codeChallenge = "4tgl2ggNilZyGn-lwnNCUOC1zCqkY9Z5-FnZ0gXUdeA";
    const codeChallengeMethod = "S256";

    const loginUrl = `${authorizationEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;

    try {
      window.location.href = loginUrl;
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
