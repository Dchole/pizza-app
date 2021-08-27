import { Field, Form, Formik } from "formik"
import {
  handleSubmit,
  initialValues,
  mobileValidationSchema
} from "./formik-config"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import PersonalDetails from "./PersonalDetails"
import { Select } from "formik-material-ui"
import { makeStyles, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>
  createStyles({
    heading: {
      margin: theme.spacing(3, "auto", 1)
    },
    button: {
      margin: theme.spacing(2, 0)
    },
    section: {
      gap: 8,
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "auto 1fr",
      marginTop: 8
    }
  })
)

const MobileForm = () => {
  const classes = useStyles()
  const { code, ...values } = initialValues

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className={classes.heading}
      >
        Complete Checkout Form
      </Typography>
      <Formik
        initialValues={values}
        validationSchema={mobileValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <section id="personal-details" className={classes.section}>
              <Typography variant="caption">Personal Details</Typography>
              <Divider />
            </section>
            <PersonalDetails />
            <section id="payment-details" className={classes.section}>
              <Typography variant="caption">Payment Details</Typography>
              <Divider />
            </section>
            <FormControl variant="outlined" margin="normal" fullWidth>
              <InputLabel htmlFor="payment-method">Payment Method</InputLabel>
              <Field
                component={Select}
                name="paymentMethod"
                variant="outlined"
                label="Payment Method"
                inputProps={{
                  id: "payment-method"
                }}
              >
                <MenuItem value="cash">Pay in Cash</MenuItem>
                <MenuItem value="credit-card" disabled>
                  Pay with Credit Card
                </MenuItem>
                <MenuItem value="mobile-money" disabled>
                  Pay with Mobile Money
                </MenuItem>
              </Field>
            </FormControl>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              className={classes.button}
              fullWidth
            >
              Checkout
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default MobileForm
