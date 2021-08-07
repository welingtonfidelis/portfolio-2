import Head from "next/head";

import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import "../styles/animation.css";
import "../styles/globals.css";
import "../styles/modal.css";
import "../styles/carouselImages.css";
import "../styles/home.css";
import "../styles/cv.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welington Fidelis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
