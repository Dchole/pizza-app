import Button from "@material-ui/core/Button"
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-material-ui"
import { handleSubmit, initialValues } from "./login-config"

const Login = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form id="sign-in" name="sign-in">
          <Field
            id="phoneNumber"
            component={TextField}
            name="phoneNumber"
            type="tel"
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
            type="password"
            variant="outlined"
            label="Password"
            autoComplete="current-password"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            disableElevation={isSubmitting}
          >
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Login
