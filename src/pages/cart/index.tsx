import Image from "next/image"
import dynamic from "next/dynamic"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import StoreIcon from "@material-ui/icons/Store"
import CartItem from "@/components/CartItem"
import ButtonLink from "@/components/ButtonLink"
import PageLoader from "@/components/PageLoader"
import useScreenSize from "@/hooks/usScreenSize"
import { useCart } from "@/components/CartContext"
import { useState } from "react"
import { TCartItemDetails } from "@/components/CartContext"
import MobileCartItem from "@/components/CartItem/MobileCartItem"

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
      width: "100%",
      height: "100%",
      marginBottom: 26
    },
    grid: {
      [theme.breakpoints.up("sm")]: {
        gap: 24,
        display: "grid",
        gridTemplateColumns: "auto 1fr"
      }
    },
    divider: {
      width: "min(60%, 600px)",
      margin: theme.spacing(2.25, "auto"),

      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(3, "auto")
      }
    },
    buttonWrapper: {
      display: "flex",
      bottom: 16,
      padding: theme.spacing(0, 1),
      width: "100%",
      gap: 16,

      "& .MuiButton-root": {
        "& span": {
          gap: 8
        }
      },

      [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-end",
        transform: "initial",

        "& .MuiButton-root": {
          width: 300
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
  const desktop = useScreenSize("lg")
  const tablet = useScreenSize()
  const { cart, fetchingDetails, clearCart, totalAmount } = useCart()
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
        {fetchingDetails ? (
          <PageLoader />
        ) : cart.length ? (
          <>
            <div className={classes.grid}>
              <Typography variant="srOnly" component="h1">
                Cart items
              </Typography>
              <div>
                {cart.map(item =>
                  tablet ? (
                    <CartItem
                      key={item.id}
                      item={item}
                      handleSelect={handleSelect}
                    />
                  ) : (
                    <MobileCartItem key={item.id} item={item} />
                  )
                )}
              </div>
              {selectedItem && (
                <SelectedCartItem
                  item={selectedItem}
                  handleDeselect={handleCloseSelect}
                />
              )}
            </div>
            <Divider variant="middle" className={classes.divider} />
            <div className={classes.buttonWrapper}>
              <Button
                color="primary"
                variant="outlined"
                onClick={clearCart}
                fullWidth
              >
                <span>Clear Cart</span>
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleOpen}
                fullWidth
              >
                <span>Buy all</span>
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
