import { Form, Formik } from "formik"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import {
  handleSubmit,
  initialValues
} from "@/components/Auth/config/forgot_password-config"

const ForgotPassword = () => {
  return (
    <Container maxWidth="sm">
      <Paper>
        <Typography>Find Password</Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form></Form>
        </Formik>
      </Paper>
    </Container>
  )
}

export default ForgotPassword
