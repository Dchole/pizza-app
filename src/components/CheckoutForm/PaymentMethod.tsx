import { useFormStyles } from "./useFormStyles"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import { RadioGroup } from "formik-material-ui"
import { Field } from "formik"

interface IProps {
  error: boolean
  isSubmitting: boolean
}

const PaymentMethod: React.FC<IProps> = ({ error, isSubmitting }) => {
  const classes = useFormStyles()

  return (
    <FormControl component="fieldset" error={error}>
      <FormLabel component="legend">Select Payment Method</FormLabel>
      <Field
        component={RadioGroup}
        aria-label="payment method"
        name="paymentMethod"
      >
        <FormControlLabel
          value="cash"
          control={<Radio disabled={isSubmitting} />}
          label="Pay in cash"
          disabled={isSubmitting}
        />
        <FormControlLabel
          value="credit-card"
          control={<Radio disabled />}
          label="Pay with Credit Card"
          disabled
        />
        <FormControlLabel
          value="mobile-money"
          control={<Radio disabled />}
          label="Pay with Mobile Money"
          disabled
        />
      </Field>
      <FormHelperText>Pay in cash on delivery</FormHelperText>
    </FormControl>
  )
}

export default PaymentMethod
