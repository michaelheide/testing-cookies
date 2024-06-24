import "@/styles/globals.css";
import type { AppProps } from "next/app";
import getInitialPropsApp from "@/pages/getInitialPropsApp";

export default function PortalApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
PortalApp.getInitialProps = getInitialPropsApp;
