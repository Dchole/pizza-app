import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Link from "../Link"
import useScreenSize from "@/hooks/usScreenSize"
import { useForgotPassStyles } from "./styles/useForgotPassStyles"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import { TSchema } from "./config/forgot_password-config"

interface IProps {
  heading: string
  description: string
  initialValues: Record<string, string>
  validationSchema: TSchema
  handleSubmit: (
    values: Record<string, string>,
    actions: FormikHelpers<Record<string, string>>
  ) => void
  inputProps: {
    id: string
    name: string
    label: string
    type?: string
    autoComplete: string
  }
}

const ForgotPassword: React.FC<IProps> = ({
  heading,
  description,
  initialValues,
  validationSchema,
  handleSubmit,
  inputProps
}) => {
  const classes = useForgotPassStyles()
  const desktop = useScreenSize()

  return (
    <Container maxWidth="sm" disableGutters={!desktop}>
      <Paper variant="outlined" component="main" className={classes.paper}>
        <Typography variant="h3" component="h1" align="center">
          {heading}
        </Typography>
        <Typography align="center">{description}</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                margin="normal"
                variant="outlined"
                component={TextField}
                fullWidth
                {...inputProps}
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
        <Grid justifyContent="space-between" container>
          <Link href="/register" variant="body1">
            Create new Account
          </Link>
          <Typography component="span">
            Remembered Password? <Link href="/login">Login</Link>
          </Typography>
        </Grid>
      </Paper>
    </Container>
  )
}

export default ForgotPassword
