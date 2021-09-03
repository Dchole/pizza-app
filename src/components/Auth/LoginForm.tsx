import { Formik, Form, Field } from "formik"
import { TextField } from "formik-material-ui"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Collapse from "@material-ui/core/Collapse"
import InputAdornment from "@material-ui/core/InputAdornment"
import {
  handleSubmit,
  initialValues,
  validationSchema
} from "./config/login-config"
import { useFormStyles } from "./styles/useFormStyles"
import firebase from "@/lib/firebase"
import useAuth from "@/hooks/useAuth"
import Toast from "../Toast"

const LoginForm: React.FC<{ appVerifier: firebase.auth.RecaptchaVerifier }> = ({
  appVerifier
}) => {
  const classes = useFormStyles()
  const {
    step,
    error,
    loading,
    clearError,
    handleResend,
    handleNextStep,
    confirmationResult
  } = useAuth(appVerifier)

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          handleSubmit(values, actions, confirmationResult)
        }
      >
        {({ values, isSubmitting }) => (
          <Form id="sign-in" name="sign-in">
            <Field
              id="phone-number-input"
              component={TextField}
              name="phoneNumber"
              type="tel"
              margin="normal"
              variant="outlined"
              label="Phone Number"
              placeholder="Ex. 0240000000"
              autoComplete="tel"
              maxLength={10}
              minLength={10}
              aria-required
              autoFocus
              fullWidth
              InputProps={{
                "aria-describedby": "phone-number-progress",
                "aria-busy": loading,
                endAdornment: loading ? (
                  <InputAdornment position="end">
                    <CircularProgress
                      id="phone-number-progress"
                      size={24}
                      color="secondary"
                    />
                  </InputAdornment>
                ) : undefined
              }}
            />
            <Collapse in={step === 1} mountOnEnter unmountOnExit>
              <Field
                id="confirmation-code-input"
                component={TextField}
                name="code"
                margin="normal"
                variant="outlined"
                label="Confirmation Code"
                autoComplete="off"
                maxLength={6}
                minLength={6}
                aria-required
                fullWidth
                autoFocus
                className={classes.input}
                inputProps={{ inputMode: "numeric" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        color="secondary"
                        onClick={() => handleResend(values.phoneNumber)}
                      >
                        Resend Code
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </Collapse>
            <div id="recaptcha-container" className={classes.button}>
              {step === 0 ? (
                <Button
                  id="sign-in-button"
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={loading || isSubmitting}
                  disableElevation={loading || isSubmitting}
                  onClick={() => handleNextStep(values.phoneNumber)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  id="sign-in-button"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading || isSubmitting}
                  disableElevation={loading || isSubmitting}
                >
                  {isSubmitting ? "Sign in" : <CircularProgress size={24} />}
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <Toast
        open={Boolean(error)}
        severity="error"
        message={error}
        handleClose={clearError}
      />
    </>
  )
}

export default LoginForm
