import Image from "next/image"
import dynamic from "next/dynamic"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import StoreIcon from "@material-ui/icons/Store"
import CartItem from "@/components/CartItem"
import ButtonLink from "@/components/ButtonLink"
import useScreenSize from "@/hooks/usScreenSize"
import { useCart } from "@/components/CartContext"
import { useState } from "react"

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
      width: "100%",
      marginBottom: 42
    },
    total: {
      display: "flex",
      justifyContent: "flex-end",

      "& p": {
        display: "flex",
        alignItems: "flex-end"
      }
    },
    buttonWrapper: {
      position: "fixed",
      bottom: 16,
      padding: theme.spacing(0, 1),
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",

      "& .MuiButton-root": {
        "& span": {
          gap: 8
        }
      },

      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "flex-end",
        bottom: "16%",
        right: "5%",
        left: "initial",
        transform: "initial",

        "& .MuiButton-root": {
          width: "fit-content"
        }
      },

      [theme.breakpoints.up("lg")]: {
        right: "15%"
      },

      [theme.breakpoints.up("xl")]: {
        right: "25%"
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
  const { cart, totalAmount } = useCart()

  const handleOpen = () => (desktop ? setOpenDialog(true) : setOpenSheet(true))
  const handleClose = () => {
    setOpenDialog(false)
    setOpenSheet(false)
  }

  return (
    <Container maxWidth="md" className={classes.root} disableGutters={!desktop}>
      {cart.length ? (
        <>
          <>
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </>
          <div className={classes.total}></div>
          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpen}
              fullWidth
            >
              <span>Checkout</span>
              <Typography
                variant="body2"
                component="span"
                aria-label={`${totalAmount} cedis`}
              >
                (<small>₵</small>&nbsp;
                <span id="total-amount">{totalAmount}</span>)
              </Typography>
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
