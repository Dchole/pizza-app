import { useRouter } from "next/router"
import Script from "next/script"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import useUser, { IUser } from "@/hooks/useUser"
import { init } from "@/lib/google-auth"
import GoogleIcon from "./GoogleIcon"
import Link from "../Link"
import Login from "./Login"
import Register from "./Register"
import { useWrapperStyles } from "./styles/useWrapperStyles"
import { fetcher } from "@/utils/fetcher"

interface IFormWrapperProps {
  view?: "login" | "register"
}

const FormWrapper: React.FC<IFormWrapperProps> = ({ view }) => {
  const { pathname, replace } = useRouter()
  const { mutate } = useUser()
  const classes = useWrapperStyles()
  const onLoginPage = pathname === "/login" || view === "login"
  const onAuthPage = pathname === "/login" || pathname === "/register"

  const loginWithGoogle = async () => {
    try {
      const GoogleAuth = gapi.auth2.getAuthInstance()
      const data = await GoogleAuth.signIn({ fetch_basic_profile: true })
      const basicProfile = data.getBasicProfile()

      const user = {
        firstName: basicProfile.getName(),
        lastName: basicProfile.getName(),
        email: basicProfile.getEmail(),
        imageUrl: basicProfile.getImageUrl()
      }

      const currentUser = await fetcher<IUser>("/api/google-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      mutate(currentUser)
      replace("/store")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Script
        src="https://apis.google.com/js/api.js"
        onLoad={() => gapi.load("client", init)}
      ></Script>
      <Typography
        variant={onAuthPage ? "h3" : "h4"}
        component={onAuthPage ? "h1" : "h2"}
        align="center"
        gutterBottom
      >
        {onLoginPage ? "Login to Your Account" : "Create a New Account"}
      </Typography>
      <div className={classes.button}>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={loginWithGoogle}
        >
          {onLoginPage ? "Sign in " : "Sign Up "} with google
        </Button>
      </div>
      <div className={classes.divider}>
        <Divider />
        <span>OR</span>
        <Divider />
      </div>
      {onLoginPage ? <Login /> : <Register />}
      <Grid alignItems="center" justify="space-between" container>
        <Typography component="span">
          {onLoginPage ? (
            <>
              Don&apos;t have an account?&nbsp;
              <Link href={onAuthPage ? "/register" : "#register"}>
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?&nbsp;
              <Link href={onAuthPage ? "/login" : "#login"}>Login</Link>
            </>
          )}
        </Typography>
      </Grid>
    </>
  )
}

export default FormWrapper
