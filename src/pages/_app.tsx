import "@styles/globals.css";
import type { AppProps } from "next/app";
import { SearchWrapper } from "@components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchWrapper>
      <Component {...pageProps} />
    </SearchWrapper>
  );
}
