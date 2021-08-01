import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import GoogleIcon from "./GoogleIcon"
import { useWrapperStyles } from "./styles/useWrapperStyles"
import { useEffect, useRef, useState } from "react"
import firebase from "@/lib/firebase"
import useScreenSize from "@/hooks/usScreenSize"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import { useRouter } from "next/router"

interface IFormWrapperProps {
  view?: "login" | "register" | null
}

const FormWrapper: React.FC<IFormWrapperProps> = ({ view }) => {
  const { pathname } = useRouter()
  const classes = useWrapperStyles()
  const desktop = useScreenSize()
  const onLoginView = view === "login" || pathname === "/login"
  const [appVerifier, setAppVerifier] =
    useState<firebase.auth.RecaptchaVerifier | null>(null)

  const loginWithGoogle = async () => {
    try {
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
    </>
  )
}

export default FormWrapper
