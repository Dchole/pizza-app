import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Form, Formik, FormikErrors, FormikProps } from "formik"
import PaymentMethod from "./PaymentMethod"
import PersonalDetails from "./PersonalDetails"
import { useFormStyles } from "./useFormStyles"
import {
  confirmation,
  handleSubmit,
  initialValues,
  paymentDetails,
  personalDetails,
  TValues,
  validationSchema
} from "./formik-config"
import Confirm from "./Confirm"
import { useUser } from "../UserContext"

interface IActiveStepProps {
  step: number
  formik: FormikProps<TValues>
}

const ActiveStep: React.FC<IActiveStepProps> = ({ step, formik }) => {
  const { errors, touched, isSubmitting } = formik

  switch (step) {
    case 0:
      return <PersonalDetails />

    case 1:
      return (
        <PaymentMethod
          error={errors.paymentMethod && touched.paymentMethod}
          isSubmitting={isSubmitting}
          errorMessage={errors.paymentMethod}
        />
      )

    case 2:
      return <Confirm />

    default:
      return null
  }
}

interface ICheckoutFormProps {
  activeStep: number
  numberOfSteps: number
  handleNextStep: () => void
  handlePrevStep: () => void
}

const CheckoutForm: React.FC<ICheckoutFormProps> = ({
  activeStep,
  numberOfSteps,
  handleNextStep,
  handlePrevStep
}) => {
  const classes = useFormStyles()
  const { user } = useUser()
  const defaultValues: TValues = {
    ...initialValues,
    displayName: user?.displayName || "",
    phoneNumber: user?.phoneNumber || "",
    location: user?.location || "",
    address: user?.address || ""
  }

  const onNextStep =
    ({ errors, setFieldTouched }: FormikProps<TValues>) =>
    async () => {
      const steps = {
        0: personalDetails,
        1: paymentDetails,
        2: confirmation
      }

      const fields = Object.keys(steps[activeStep])

      fields.forEach(field => setFieldTouched(field))
      const error = Object.keys(errors).some(field => fields.includes(field))

      console.log(errors)

      if (!error) handleNextStep()
    }

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Complete the checkout form
      </Typography>
      <Formik
        validateOnMount
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            <div className={classes.step}>
              <ActiveStep step={activeStep} formik={formik} />
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                color="primary"
                variant="outlined"
                onClick={handlePrevStep}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={
                  activeStep === numberOfSteps - 1
                    ? formik.submitForm
                    : onNextStep(formik)
                }
                disabled={activeStep === numberOfSteps}
              >
                {activeStep >= numberOfSteps - 1 ? "Checkout" : "Continue"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CheckoutForm
