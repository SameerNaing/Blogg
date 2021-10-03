import type { AppProps } from "next/app";
import { Provider as NextAuthSessionProvider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";

import customThemes from "custom-themes";
import { store } from "src/store";

import "global-styles";

/** use mock service worker in development mode */
if (process.env.NODE_ENV === "development") {
  require("../../mocks/index");
}

/** Add editional keys to Window object */
declare global {
  interface Window {
    Cypress: any;
    store: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  /** To test redux state in Cypress */
  if (process.browser && process.env.NODE_ENV === "development") {
    window.Cypress && (window.store = store);
  }
  return (
    <>
      <NextNProgress />
      <NextAuthSessionProvider session={pageProps.session}>
        <ChakraProvider theme={customThemes}>
          <ReduxProvider store={store}>
            <Component {...pageProps} />
          </ReduxProvider>
        </ChakraProvider>
      </NextAuthSessionProvider>
    </>
  );
}
export default MyApp;
