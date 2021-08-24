import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import MoneyIcon from "@material-ui/icons/Money"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import MoMoIcon from "@material-ui/icons/MobileScreenShare"
import { useFormStyles } from "./useFormStyles"
import { useState } from "react"

const PaymentMethod = () => {
  const classes = useFormStyles()
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { method } = event.currentTarget.dataset
    setPaymentMethod(method)
  }

  return (
    <div>
      <Typography variant="body2" color="textSecondary">
        Select Payment Method
      </Typography>
      <div className={classes.method}>
        <ButtonBase
          data-method="cash"
          title="pay in cash"
          aria-label="pay in cash"
          onClick={handleSelect}
          className={paymentMethod === "cash" ? classes.selected : undefined}
        >
          <MoneyIcon fontSize="large" />
          <Typography variant="h6" component="p">
            Cash
          </Typography>
        </ButtonBase>
        <ButtonBase
          data-method="credit-card"
          title="pay with credit card"
          aria-label="pay with credit card"
          disabled
        >
          <CreditCardIcon fontSize="large" color="action" />
          <Typography variant="h6" component="p" color="textSecondary">
            Credit Cart
          </Typography>
        </ButtonBase>
        <ButtonBase
          data-method="mobile-money"
          title="pay with mobile money"
          aria-label="pay with mobile money"
          disabled
        >
          <MoMoIcon fontSize="large" color="action" />
          <Typography variant="h6" component="p" color="textSecondary">
            Mobile Money
          </Typography>
        </ButtonBase>
      </div>
    </div>
  )
}

export default PaymentMethod
