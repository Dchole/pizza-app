import Image from "next/image"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import { useState } from "react"
import { useCart } from "@/components/CartContext"
import { loader } from "@/utils/imageLoader"
import Steps, { steps } from "@/components/Checkout/CheckoutForm/Steps"
import CheckoutForm from "@/components/Checkout/CheckoutForm"
import PageLoader from "@/components/PageLoader"
import { useDesktopStyles } from "./styles/useDesktopStyles"

const Desktop = () => {
  const classes = useDesktopStyles()
  const [activeStep, setActiveStep] = useState(0)
  const { cart, getItemPrice, getItemQuantity, fetchingDetails } = useCart()

  const handleNextStep = () => setActiveStep(activeStep + 1)
  const handlePrevStep = () => setActiveStep(activeStep - 1)

  return (
    <main className={classes.root}>
      <div className={classes.itemList}>
        {fetchingDetails ? (
          <PageLoader />
        ) : (
          cart.map(item => (
            <div key={item.pizza_id} className="item-details">
              <Image
                loader={loader}
                src={item.image.formats.thumbnail.url}
                alt={item.name}
                width={80}
                height={80}
                className={classes.image}
                objectFit="cover"
              />
              <div className="item-text">
                <div className="item-header">
                  <Typography variant="h5" component="p">
                    {item.name}
                  </Typography>
                  <Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textSecondary"
                    >
                      ₵
                    </Typography>{" "}
                    {getItemPrice(item.pizza_id)}
                  </Typography>
                </div>
                <Typography color="textSecondary" variant="body2">
                  {getItemQuantity(item.pizza_id)} pcs
                </Typography>
              </div>
            </div>
          ))
        )}
      </div>
      <Divider orientation="vertical" className={classes.divider} light />
      <CheckoutForm
        numberOfSteps={steps.length}
        activeStep={activeStep}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      />
      <Divider orientation="vertical" className={classes.divider} light />
      <Steps activeStep={activeStep} />
    </main>
  )
}

export default Desktop
