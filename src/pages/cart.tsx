import dynamic from "next/dynamic"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import PaymentIcon from "@material-ui/icons/Payment"
import PageBackdrop from "@/components/PageBackdrop"
import CartItem from "@/components/CartItem"
import { useCart } from "@/components/CartContext"
import useScreenSize from "@/hooks/usScreenSize"

const AnimatedNumber = dynamic(() => import("react-animated-numbers"))

export const useStyles = makeStyles(theme =>
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
    }
  })
)

const Cart = () => {
  const classes = useStyles()
  const { cartItems, totalAmount } = useCart()
  const mobile = useScreenSize()

  return (
    <PageBackdrop>
      <Container maxWidth="md" className={classes.root} disableGutters={mobile}>
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
        <Button
          color="primary"
          variant="contained"
          endIcon={<PaymentIcon />}
          fullWidth
        >
          Checkout
        </Button>
      </Container>
    </PageBackdrop>
  )
}

export default Cart
