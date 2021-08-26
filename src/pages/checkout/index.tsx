import Image from "next/image"
import Head from "next/head"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useCart } from "@/components/CartContext"
import { loader } from "@/utils/imageLoader"
import Steps, { steps } from "@/components/CheckoutForm/Steps"
import CheckoutForm from "@/components/CheckoutForm"
import PageLoader from "@/components/PageLoader"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginTop: 20
  },
  divider: {
    height: 400,
    margin: theme.spacing(0, 8)
  },
  image: {
    borderRadius: 10
  },
  itemList: {
    minWidth: 320,
    marginBottom: 12,

    "& .item-details": {
      display: "flex",
      gap: 12,
      marginBottom: 28,

      "& .item-text": {
        width: "100%"
      },

      "& .item-header": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "fit-content",

        "& .MuiTypography-h5": {
          fontFamily: theme.typography.h1.fontFamily
        }
      }
    }
  }
}))

const Checkout = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const {
    cart,
    getItemPrice,
    getItemQuantity,
    totalAmount,
    totalQuantity,
    fetchingDetails
  } = useCart()

  const handleNextStep = () => setActiveStep(activeStep + 1)
  const handlePrevStep = () => setActiveStep(activeStep - 1)

  return (
    <>
      <Head>
        <title>
          Checkout {totalQuantity} items for {totalAmount}
        </title>
      </Head>
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
    </>
  )
}

export default Checkout
