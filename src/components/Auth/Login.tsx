import { Formik, Form, Field } from "formik"
import { TextField } from "formik-material-ui"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import useToggleVisibility from "@/hooks/useToggleVisibilty"
import { handleSubmit, initialValues } from "./config/login-config"
import { useFormStyles } from "./styles/useFormStyles"
import Link from "../Link"

const Login = () => {
  const classes = useFormStyles()
  const { showPassword, handleToggle } = useToggleVisibility()

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form id="sign-in" name="sign-in">
          <Field
            id="phoneNumber"
            component={TextField}
            name="phoneNumber"
            type="tel"
            margin="normal"
            variant="outlined"
            label="Phone Number"
            autoComplete="tel"
            autoFocus
            fullWidth
          />
          <Field
            id="current-password"
            component={TextField}
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            variant="outlined"
            label="Password"
            autoComplete="current-password"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggle}
                    aria-label={
                      showPassword ? "hide password" : "show password"
                    }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <div className={classes.link}>
            <Link href="/forgot-password">Forgot Password</Link>
          </div>
          <div className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              disableElevation={isSubmitting}
            >
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Login
