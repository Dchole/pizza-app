import CheckoutForm from "./Form"
import Divider from "@material-ui/core/Divider"
import Steps, { steps } from "./Steps"
import { useState } from "react"
import { useDesktopStyles } from "../styles/useDesktopStyles"

const FormSteps = () => {
  const classes = useDesktopStyles()
  const [activeStep, setActiveStep] = useState(0)

  const handleNextStep = () => setActiveStep(activeStep + 1)
  const handlePrevStep = () => setActiveStep(activeStep - 1)

  return (
    <>
      <CheckoutForm
        numberOfSteps={steps.length}
        activeStep={activeStep}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      />
      <Divider orientation="vertical" className={classes.divider} light />
      <Steps activeStep={activeStep} />
    </>
  )
}

export default FormSteps
