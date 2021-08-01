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
} from "./config/register-config"
import { useFormStyles } from "./styles/useFormStyles"
import { useState } from "react"
import { formatMobile } from "@/utils/format-mobile"
import firebase from "@/lib/firebase"
import useAuth from "@/hooks/useAuth"
import Toast from "../Toast"

const RegisterForm: React.FC<{ appVerifier: firebase.auth.RecaptchaVerifier }> =
  ({ appVerifier }) => {
    const classes = useFormStyles()
    const {
      step,
      error,
      loading,
      confirmationResult,
      handleNextStep,
      handleResend,
      clearError
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
          {({ values, isSubmitting, submitForm }) => (
            <Form id="sign-up" name="sign-up">
              <Field
                id="account-name-input"
                component={TextField}
                name="displayName"
                margin="normal"
                variant="outlined"
                label="Account Name"
                placeholder="Ex. John Doe"
                autoComplete="name"
                aria-required
                autoFocus
                fullWidth
                disabled={loading || !!step}
              />
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
                fullWidth
                disabled={loading || !!step}
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
                    id="sign-up-button"
                    type="button"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    disableElevation={loading}
                    onClick={() => handleNextStep(values.phoneNumber)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    id="sign-up-button"
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    disableElevation={isSubmitting}
                    onClick={submitForm}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : "Sign up"}
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

export default RegisterForm
