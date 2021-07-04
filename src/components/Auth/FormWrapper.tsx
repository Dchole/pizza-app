import { useRouter } from "next/router"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import GoogleIcon from "./GoogleIcon"
import Link from "../Link"
import { useWrapperStyles } from "./styles/useWrapperStyles"

interface IFormWrapperProps {
  view: "login" | "register"
  handleChangeView?: () => void
}

const FormWrapper: React.FC<IFormWrapperProps> = ({
  view,
  children,
  handleChangeView
}) => {
  const { pathname } = useRouter()
  const classes = useWrapperStyles()
  const onLoginPage = pathname === "/login" || view === "login"
  const onAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <>
      <Typography
        variant={onAuthPage ? "h3" : "h4"}
        component={onAuthPage ? "h1" : "h2"}
        gutterBottom
      >
        {onLoginPage ? "Login to Your Account" : "Create a New Account"}
      </Typography>
      <div className={classes.button}>
        <Button variant="contained" startIcon={<GoogleIcon />}>
          {onLoginPage ? "Sign in " : "Sign Up "} with google
        </Button>
      </div>
      <div className={classes.divider}>
        <Divider />
        <span>OR</span>
        <Divider />
      </div>
      {children}
      <Grid alignItems="center" justify="space-between" container>
        <Typography component="span">
          {onLoginPage ? (
            <>
              Don&apos;t have an account?&nbsp;
              <Link
                href={onAuthPage ? "/register" : "#register"}
                onClick={handleChangeView}
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?&nbsp;
              <Link
                href={onAuthPage ? "/login" : "#login"}
                onClick={handleChangeView}
              >
                Login
              </Link>
            </>
          )}
        </Typography>
      </Grid>
    </>
  )
}

export default FormWrapper
