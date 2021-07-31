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
} from "./config/signin-config"
import { useFormStyles } from "./styles/useFormStyles"
import firebase from "@/lib/firebase"
import { useRef, useState } from "react"
import { formatMobile } from "@/utils/format-mobile"

const SignIn: React.FC<{ appVerifier: firebase.auth.RecaptchaVerifier }> = ({
  appVerifier
}) => {
  const classes = useFormStyles()
  const [step, setStep] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const confirmationResult = useRef<firebase.auth.ConfirmationResult>(null)

  const handleNextStep = async (phoneNumber: string) => {
    console.log(phoneNumber)
    try {
      setLoading(true)
      confirmationResult.current = await firebase
        .auth()
        .signInWithPhoneNumber("+" + formatMobile(phoneNumber), appVerifier)

      !step && setStep(step + 1)
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) =>
        handleSubmit(values, actions, confirmationResult.current)
      }
    >
      {({ values, isSubmitting, ...actions }) => (
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
              inputProps={{ inputMode: "numeric" }}
              fullWidth
              autoFocus
              className={classes.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button color="secondary">Resend Code</Button>
                  </InputAdornment>
                )
              }}
            />
          </Collapse>
          <div className={classes.button}>
            <Button
              id="sign-in-button"
              type={step === 1 ? "submit" : "button"}
              variant="contained"
              color="primary"
              disabled={loading || isSubmitting}
              disableElevation={loading || isSubmitting}
              onClick={
                step === 0
                  ? () => handleNextStep(values.phoneNumber)
                  : () =>
                      handleSubmit(values, actions, confirmationResult.current)
              }
            >
              {step === 0 ? "Next" : "Sign in"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignIn
