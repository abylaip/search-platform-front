import { useLayoutEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const redirectToLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize?response_type=code&client_id=search-platform-client&scope=openid&redirect_uri=https://search-platform-front.vercel.app/auth_code&code_challenge=Ak_guIA-N5j1wtr-Pm8XpDQcCTCabjylZVWsdXiLq-w&code_challenge_method=S256`
      );
      if (response.status === 302) {
        // router.push("https://6b30-178-90-95-197.ngrok-free.app/login");
      }
    } catch (error) {
      router.push("https://6b30-178-90-95-197.ngrok-free.app/login");
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    redirectToLogin();
  }, []);
};

export default Login;
