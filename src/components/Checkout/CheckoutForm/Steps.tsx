import { makeStyles } from "@material-ui/core/styles"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Stepper from "@material-ui/core/Stepper"

const useStyles = makeStyles({
  root: {
    height: "fit-content",
    minWidth: 250
  }
})

interface IStepsProps {
  activeStep: number
}

export const steps = ["Personal Details", "Payment Method", "Confirm Details"]

const Steps: React.FC<IStepsProps> = ({ activeStep }) => {
  const classes = useStyles()

  return (
    <Stepper
      orientation="vertical"
      activeStep={activeStep}
      className={classes.root}
    >
      {steps.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default Steps
