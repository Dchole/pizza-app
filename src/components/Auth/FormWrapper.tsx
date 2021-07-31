import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import GoogleIcon from "./GoogleIcon"
import { useWrapperStyles } from "./styles/useWrapperStyles"
import { useEffect, useRef } from "react"
import firebase from "@/lib/firebase"
import SignIn from "./SignUp"
import useScreenSize from "@/hooks/usScreenSize"

interface IFormWrapperProps {
  view?: "login" | "register" | null
}

const FormWrapper: React.FC<IFormWrapperProps> = ({ view }) => {
  const appVerifier = useRef<firebase.auth.RecaptchaVerifier>(null)
  const classes = useWrapperStyles()
  const desktop = useScreenSize()

  const loginWithGoogle = async () => {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    appVerifier.current = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: response => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response)
        }
      }
    )
  }, [])

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
      <SignIn appVerifier={appVerifier.current} />
    </>
  )
}

export default FormWrapper
