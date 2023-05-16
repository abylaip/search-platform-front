import "@styles/globals.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import { SearchWrapper } from "@components";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(
  () => {
    return import("../components/progress-bar/progress-bar");
  },
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopProgressBar />
      <SearchWrapper>
        <Component {...pageProps} />
      </SearchWrapper>
    </>
  );
}
