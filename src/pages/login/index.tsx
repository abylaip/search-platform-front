import { useLayoutEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("https://fda1-178-90-95-197.ngrok-free.app/login");
  }, []);
};

export default Login;
