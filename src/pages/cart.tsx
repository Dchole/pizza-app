import CircularProgress from "@material-ui/core/CircularProgress"
import PageBackdrop from "@/components/PageBackdrop"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import CartItem from "@/components/CartItem"
import { useCart } from "@/components/CartContext"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      backgroundColor: theme.palette.background.default
    }
  })
)

const Cart = () => {
  const classes = useStyles()
  const { cartItems } = useCart()

  return (
    <PageBackdrop>
      <main className={classes.root}>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </main>
    </PageBackdrop>
  )
}

export default Cart
