import Container from "@material-ui/core/Container"
import PageBackdrop from "@/components/PageBackdrop"
import CartItem from "@/components/CartItem"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { useCart } from "@/components/CartContext"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "grid",
      gap: 16,
      backgroundColor: theme.palette.background.default,
      height: "100%",
      width: "100%",

      [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "1fr 1fr",
        backgroundColor: "white",
        gap: 24
      }
    }
  })
)

const Cart = () => {
  const classes = useStyles()
  const { cartItems } = useCart()

  return (
    <PageBackdrop>
      <Container maxWidth="md" className={classes.root}>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </Container>
    </PageBackdrop>
  )
}

export default Cart
