import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import GoogleIcon from "./GoogleIcon"
import { useWrapperStyles } from "./styles/useWrapperStyles"
import { useEffect, useState } from "react"
import firebase from "@/lib/firebase"
import useScreenSize from "@/hooks/usScreenSize"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import Link from "../Link"
import { useRouter } from "next/router"
import useDevice from "@/hooks/useDevice"

interface IProps {
  view?: "login" | "register" | null
}

const FormWrapper: React.FC<IProps> = ({ view }) => {
  const { pathname, replace } = useRouter()
  const classes = useWrapperStyles()
  const desktop = useScreenSize()
  const device = useDevice()
  const onLoginView = view === "login" || pathname === "/login"
  const [appVerifier, setAppVerifier] =
    useState<firebase.auth.RecaptchaVerifier | null>(null)

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()

      device === "desktop"
        ? await firebase.auth().signInWithPopup(provider)
        : await firebase.auth().signInWithRedirect(provider)

      replace(pathname === "/" ? "/store" : window.location.pathname)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        onLoginView ? "sign-in-button" : "sign-up-button",
        {
          size: "invisible",
          callback: response => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log(response)
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            console.log("Recaptcha Expired")
          }
        }
      )

      setAppVerifier(recaptchaVerifier)
    } catch (error) {
      console.log(error)
    }
  }, [onLoginView])

  return (
    <>
      <Typography
        variant={desktop ? "h4" : "h3"}
        component={desktop ? "h2" : "h1"}
        align="center"
        gutterBottom
      >
        Sign into your account
      </Typography>
      <div className={classes.button}>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={loginWithGoogle}
        >
          Sign in with google
        </Button>
      </div>
      <div className={classes.divider}>
        <Divider />
        <span>OR</span>
        <Divider />
      </div>
      {onLoginView ? (
        <LoginForm appVerifier={appVerifier} />
      ) : (
        <RegisterForm appVerifier={appVerifier} />
      )}
      <Grid alignItems="center" justifyContent="space-between" container>
        <Typography component="span">
          {onLoginView ? (
            <>
              Don&apos;t have an account?&nbsp;
              <Link href={desktop ? "#register" : "/register"}>
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?&nbsp;
              <Link href={desktop ? "#login" : "/login"}>Login</Link>
            </>
          )}
        </Typography>
      </Grid>
    </>
  )
}

export default FormWrapper
