import "@styles/globals.css";
import type { AppProps } from "next/app";
import { SearchWrapper, AuthWrapper } from "@components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthWrapper>
      <SearchWrapper>
        <Component {...pageProps} />
      </SearchWrapper>
    </AuthWrapper>
  );
}
