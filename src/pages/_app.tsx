import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { paddingX } from "../utils";
import clsx from "clsx";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen text-white bg-dark">
      <Header />
      <Component {...pageProps} />
      <div className={clsx(paddingX, "pb-[149px] md:pb-[112px]")}>
        <div className="mx-auto max-w-content">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
