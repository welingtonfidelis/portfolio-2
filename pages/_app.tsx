import Head from "next/head";
import { I18nextProvider } from "react-i18next";

import i18n from "../i18n";
import { storeWrapper } from "../store";

import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import "../styles/animation.css";
import "../styles/modal.css";
import "../styles/carouselImages.css";
import "../styles/home.css";
import "../styles/cv.css";
import "../styles/easterEgg.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { LanguageInterface } from "../store/language/model";
import { useSelector } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const languageOnRedux = useSelector(
    (state: { language: LanguageInterface }) => state.language
  );

  useEffect(() => {
    i18n.changeLanguage(languageOnRedux.language);
  }, [languageOnRedux.language]);

  return (
    <>
      <Head>
        <title>Welington Fidelis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <I18nextProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nextProvider>
    </>
  );
}
export default storeWrapper.withRedux(MyApp);
