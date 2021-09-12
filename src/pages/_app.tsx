import "@fontsource/rubik"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"

import Head from "next/head"
import { AppProps } from "next/app"
import { useEffect } from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { initializeFirebase } from "@/lib/firebase"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "@/components/Layout"
import theme from "@/lib/theme"

export default function MyApp({ Component, pageProps }: AppProps) {
  initializeFirebase()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="google-site-verification"
          content="GjvVPMGUIbN7Yv9nsUlYxZYxqREXEggGGv-nc8h3-38"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      <style jsx global>{`
        :root {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  )
}
