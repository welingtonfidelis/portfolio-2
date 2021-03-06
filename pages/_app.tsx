import Head from "next/head";
import { I18nextProvider } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import type { AppProps } from "next/app";
import { useEffect } from "react";

import i18n from "../i18n";
import { storeWrapper } from "../store";
import { changeTheme } from "../store/theme/actions";
import { changeLanguage } from "../store/language/actions";

import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import "../styles/animation.css";
import "../styles/modal.css";
import "../styles/carouselImages.css";
import "../styles/home.css";
import "../styles/cv.css";
import "../styles/easterEgg.css";
import { LanguageInterface } from "../store/language/model";


function MyApp({ Component, pageProps }: AppProps) {
  const AppComponent = Component as any;
  const dispatch = useDispatch();
  const languageOnRedux = useSelector(
    (state: { language: LanguageInterface }) => state.language
  );

  useEffect(() => {
    i18n.changeLanguage(languageOnRedux.language);
  }, [languageOnRedux.language]);

  useEffect(() => {
    const isDarkTheme = getCookie("dark_theme") as boolean;
    const language = getCookie("language") as string;
    
    if(isDarkTheme !== undefined) {
      dispatch(changeTheme({ isDarkTheme }));
    }

    if(language !== undefined) {
      dispatch(changeLanguage({ language }));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Welington Fidelis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <I18nextProvider i18n={i18n}>
        <AppComponent {...pageProps} />
      </I18nextProvider>
    </>
  );
}
export default storeWrapper.withRedux(MyApp);
