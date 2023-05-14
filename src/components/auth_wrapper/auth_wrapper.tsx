import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [state, setState] = useState(false);
  useEffect(() => {
    console.log(router.query.code);
    if (state) {
      if (router.query.code !== undefined) {
        router.push("/auth_code");
        setState(true);
      } else {
        router.push("/login");
        setState(true);
      }
    }
  }, [router]);
  return <>{children}</>;
};
