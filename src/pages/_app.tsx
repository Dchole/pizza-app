import "@fontsource/rubik"
import "@fontsource/montserrat/700.css"

import Head from "next/head"
import { AppProps } from "next/app"
import { useEffect } from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Layout from "@/components/Layout"
import theme from "@/lib/theme"
import { mutate } from "swr"

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const GoogleAuth = gapi.auth2.getAuthInstance()

    if (GoogleAuth.isSignedIn) {
      GoogleAuth.currentUser.listen(() => mutate("/api/user"))
    }
  })

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
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
