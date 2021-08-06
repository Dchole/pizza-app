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
import { TCartItemDetails } from "@/components/CartContext"

const SelectedCartItem = dynamic(() => import("@/components/SelectedCartItem"))
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
      marginBottom: 42,
      display: "grid",
      gap: 24,
      gridTemplateColumns: "auto 1fr",

      [theme.breakpoints.up("sm")]: {
        marginTop: 56
      }
    },
    buttonBar: {
      width: "80%",
      top: 90,
      left: "50%",
      transform: "translateX(-50%)",
      position: "fixed",
      display: "flex",
      justifyContent: "flex-end",

      "& .MuiButton-root": {
        width: 300,

        "& span": {
          gap: 8
        }
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
  const tablet = useScreenSize()
  const desktop = useScreenSize("lg")
  const { cart, totalAmount } = useCart()
  const [openSheet, setOpenSheet] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState({} as TCartItemDetails)

  const handleOpen = () => (desktop ? setOpenDialog(true) : setOpenSheet(true))
  const handleClose = () => {
    setOpenDialog(false)
    setOpenSheet(false)
  }

  const handleSelect = (id: string) => {
    const item = cart.find(item => item.id === id)
    item && setSelectedItem(item)
  }

  const handleCloseSelect = () => {
    setSelectedItem({} as TCartItemDetails)
  }

  return (
    <>
      <Container
        maxWidth="md"
        component="main"
        className={classes.root}
        disableGutters={!desktop}
      >
        {cart.length ? (
          <>
            <Typography variant="srOnly" component="h1">
              Cart items
            </Typography>
            <div>
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleSelect={handleSelect}
                />
              ))}
            </div>
            <SelectedCartItem
              item={selectedItem}
              handleDeselect={handleCloseSelect}
            />
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
            <Typography variant="h3" component="h1">
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
      </Container>
      <PaymentMethodDialog open={openDialog} handleClose={handleClose} />
      <PaymentMethodSheet open={openSheet} handleClose={handleClose} />
    </>
  )
}

export default Cart
