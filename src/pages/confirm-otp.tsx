import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import useScreenSize from "@/hooks/usScreenSize"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import { useConfirmationStyles } from "@/components/Auth/styles/useForgotPassStyles"
import {
  handleSubmit,
  initialValues,
  validationSchema
} from "@/components/Auth/config/confirmation-config"

const ForgotPassword = ({}) => {
  const classes = useConfirmationStyles()
  const desktop = useScreenSize()

  return (
    <Container maxWidth="sm" disableGutters={!desktop}>
      <Paper variant="outlined" component="main" className={classes.paper}>
        <Typography variant="h3" component="h1" align="center">
          Confirm Phone Number
        </Typography>
        <Typography align="center">
          Enter the pin code sent to your phone to verify your phone number
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                id="confirmation-code"
                name="code"
                type="text"
                inputMode="numeric"
                margin="normal"
                variant="outlined"
                label="Confirmation Code"
                component={TextField}
                autoComplete="off"
                fullWidth
              />
              <div className={classes.buttonWrapper}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  disableElevation={isSubmitting}
                >
                  Find Account {isSubmitting && <CircularProgress size={24} />}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

export default ForgotPassword
