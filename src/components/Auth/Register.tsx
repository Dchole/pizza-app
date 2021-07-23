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
import useScreenSize from "@/hooks/usScreenSize"

const Register = () => {
  const classes = useFormStyles()
  const desktop = useScreenSize()
  const { showPassword, handleToggle } = useToggleVisibility()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => handleSubmit(values, actions, !desktop)}
    >
      {({ isSubmitting }) => (
        <Form id="sign-up" name="sign-up">
          <Field
            id="accountName"
            component={TextField}
            name="accountName"
            margin="normal"
            variant="outlined"
            label="Account Name"
            placeholder="Ex. John Doe"
            autoComplete="name"
            autoCapitalize="on"
            autoFocus
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
