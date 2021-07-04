import { Formik, Form, Field } from "formik"
import { TextField } from "formik-material-ui"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import useToggleVisibility from "@/hooks/useToggleVisibilty"
import {
  handleSubmit,
  validationSchema,
  initialValues
} from "./config/register-config"
import { useFormStyles } from "./styles/useFormStyles"

const Register = () => {
  const classes = useFormStyles()
  const { showPassword, handleToggle } = useToggleVisibility()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form id="sign-up" name="sign-up">
          <Field
            id="firstName"
            component={TextField}
            name="firstName"
            margin="normal"
            variant="outlined"
            label="First Name"
            autoComplete="given-name"
            autoCapitalize="on"
            autoFocus
            fullWidth
          />
          <Field
            id="lastName"
            component={TextField}
            name="lastName"
            margin="normal"
            variant="outlined"
            label="Last Name"
            autoComplete="family-name"
            autoCapitalize="on"
            fullWidth
          />
          <Field
            id="phoneNumber"
            component={TextField}
            name="phoneNumber"
            type="tel"
            margin="normal"
            variant="outlined"
            label="Phone Number"
            autoComplete="tel"
            fullWidth
          />
          <Field
            id="new-password"
            component={TextField}
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            variant="outlined"
            label="Password"
            autoComplete="new-password"
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
          <div className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              disableElevation={isSubmitting}
            >
              Sign up
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Register
