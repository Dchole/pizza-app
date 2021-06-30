import "@fontsource/rubik"

import Head from "next/head"
import { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
