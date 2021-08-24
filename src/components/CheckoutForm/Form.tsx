import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/corey/CircularProgress"
import Typography from "@material-ui/core/Typography"
import PersonalDetails from "./PersonalDetails"
import { useFormStyles } from "./useFormStyles"
import Confirm from "./Confirm"
import { useUser } from "../UserContext"
import { FormikProps, useFormik } from "formik"
import { handleDetails, personalDetailsSchema, TValues } from "./formik-config"
import PaymentMethod from "./PaymentMethod"

export type TFormikProps = Omit<
  FormikProps<TValues>,
  "handleSubmit" | "isValid" | "isSubmitting"
>

interface IActiveProps {
  step: number
  personalForm: TFormikProps
}

const ActiveStep: React.FC<IActiveProps> = ({ step, personalForm }) => {
  switch (step) {
    case 0:
      return <PersonalDetails formik={personalForm} />

    case 1:
      return <PaymentMethod />

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
  const values: TValues = {
    displayName: user?.displayName || "",
    address: user?.address || "",
    location: user?.location || "",
    phoneNumber: user?.phoneNumber || ""
  }

  const {
    handleSubmit: saveDetails,
    isValid,
    isSubmitting,
    ...personalForm
  } = useFormik({
    initialValues: values,
    onSubmit: handleDetails(handleNextStep),
    validationSchema: personalDetailsSchema
  })

  const OnNextStep = (event: any) => {
    isValid && saveDetails(event)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Complete the checkout form
      </Typography>
      <div className={classes.stepContent}>
        <ActiveStep step={activeStep} personalForm={personalForm} />
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
          onClick={OnNextStep}
          disabled={activeStep === numberOfSteps || isSubmitting}
        >
          {activeStep >= numberOfSteps - 1 ? "Checkout" : "Continue"}
          {isSubmitting && <CircularProgress size={24} />}
        </Button>
      </div>
    </div>
  )
}

export default CheckoutForm
