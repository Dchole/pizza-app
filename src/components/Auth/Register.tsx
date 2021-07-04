import Button from "@material-ui/core/Button"
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-material-ui"
import {
  handleSubmit,
  validationSchema,
  initialValues
} from "./register-config"

const Register = () => {
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
            variant="outlined"
            label="Phone Number"
            autoComplete="tel"
            fullWidth
          />
          <Field
            id="new-password"
            component={TextField}
            name="password"
            type="password"
            variant="outlined"
            label="Password"
            autoComplete="new-password"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            disableElevation={isSubmitting}
            fullWidth
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Register
