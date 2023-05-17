import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
  }, [router.pathname]);
  return <>{children}</>;
};
