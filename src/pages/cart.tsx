import Image from "next/image"
import dynamic from "next/dynamic"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import PaymentIcon from "@material-ui/icons/Payment"
import StoreIcon from "@material-ui/icons/Store"
import CartItem from "@/components/CartItem"
import ButtonLink from "@/components/ButtonLink"
import useScreenSize from "@/hooks/usScreenSize"
import { useCart } from "@/components/CartContext"
import { useState } from "react"

const AnimatedNumber = dynamic(() => import("react-animated-numbers"))
const PaymentMethodDialog = dynamic(
  () => import("@/components/PaymentMethod/Dialog")
)
const PaymentMethodSheet = dynamic(
  () => import("@/components/PaymentMethod/Sheet")
)

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: "100%",
      width: "100%"
    },
    grid: {
      display: "grid",
      gap: 16,
      marginBottom: 12,

      // iPhone 5
      "@media(max-width: 320px)": {
        gap: 8
      },

      [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "1fr 1fr",
        gap: 24
      }
    },
    total: {
      display: "flex",
      justifyContent: "flex-end",

      "& p": {
        display: "flex",
        alignItems: "center"
      }
    },
    buttonWrapper: {
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "flex-end",

        "& .MuiButton-root": {
          width: "fit-content"
        }
      }
    },
    linkWrapper: {
      marginTop: 16
    }
  })
)

const Cart = () => {
  const classes = useStyles()
  const desktop = useScreenSize()
  const [openDialog, setOpenDialog] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)
  const { cartItems, totalAmount } = useCart()

  const handleOpen = () => (desktop ? setOpenDialog(true) : setOpenSheet(true))
  const handleClose = () => {
    setOpenDialog(false)
    setOpenSheet(false)
  }

  return (
    <Container maxWidth="md" className={classes.root} disableGutters={!desktop}>
      {cartItems.length ? (
        <>
          <div className={classes.grid}>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className={classes.total}>
            <p aria-label={`${totalAmount} cedis`}>
              <span>₵</span>&nbsp;
              <AnimatedNumber
                fontStyle={{ fontSize: 40 }}
                animateToNumber={totalAmount}
                includeComma
              />
              .00
            </p>
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              variant="contained"
              endIcon={<PaymentIcon />}
              onClick={handleOpen}
              fullWidth
            >
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <Grid direction="column" alignItems="center" container>
          <Image
            src="/empty-cart.svg"
            alt="empty cart illustration"
            width={300}
            height={240}
          />
          <Typography variant="h3" component="p">
            Your Cart is Empty
          </Typography>
          <Typography color="textSecondary">
            Add an item from the store
          </Typography>
          <div className={classes.linkWrapper}>
            <ButtonLink
              href="/store"
              variant="contained"
              color="primary"
              endIcon={<StoreIcon />}
            >
              Go to store
            </ButtonLink>
          </div>
        </Grid>
      )}
      <PaymentMethodDialog open={openDialog} handleClose={handleClose} />
      <PaymentMethodSheet open={openSheet} handleClose={handleClose} />
    </Container>
  )
}

export default Cart
